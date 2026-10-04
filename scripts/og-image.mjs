// Renders the front page into the 1200×630 social preview images, public/og.png (English)
// and public/og-cs.png (Czech), so the preview always matches the real page.
//
//   pnpm build && pnpm preview     # serve the site, then in another terminal:
//   pnpm og [http://localhost:4321]
//
// Needs Chromium or Chrome: the first of chromium, chromium-browser, google-chrome on the
// PATH, or the binary named in $CHROME. Talks to it over the DevTools protocol directly,
// so it needs no extra packages.

import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.argv[2] ?? "http://localhost:4321").replace(/\/$/, "");
const OUT = new URL("../public/", import.meta.url);
const PAGES = [
  { lang: "en", path: "/", file: "og.png" },
  { lang: "cs", path: "/cs/", file: "og-cs.png" },
];
// the controls make no sense in a picture: keep the logo, name, lead, photo and figures
// (the toolbar only shows up when pointed at `astro dev`)
const CARD_CSS = `.topbar .site-tools, .hero .cta, astro-dev-toolbar { display: none !important; }`;

const chrome =
  process.env.CHROME ??
  ["chromium", "chromium-browser", "google-chrome"].find(
    name => spawnSync("which", [name]).status === 0
  );
if (!chrome) throw new Error("No Chromium or Chrome found; set $CHROME.");

const profile = mkdtempSync(join(tmpdir(), "og-image-"));
const browser = spawn(chrome, [
  "--headless=new",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  "--hide-scrollbars",
  "--disable-gpu",
  "about:blank",
]);

try {
  const wsUrl = await new Promise((resolve, reject) => {
    let log = "";
    browser.stderr.on("data", chunk => {
      log += chunk;
      const match = log.match(/DevTools listening on (ws:\/\/\S+)/);
      if (match) resolve(match[1]);
    });
    browser.on("exit", code =>
      reject(new Error(`Browser exited (${code}):\n${log}`))
    );
  });
  const cdp = await connect(wsUrl);

  const { targetId } = await cdp.send("Target.createTarget", {
    url: "about:blank",
  });
  const { sessionId } = await cdp.send("Target.attachToTarget", {
    targetId,
    flatten: true,
  });
  const page = (method, params) => cdp.send(method, params, sessionId);

  await page("Page.enable");
  await page("Emulation.setDeviceMetricsOverride", {
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
    mobile: false,
  });

  for (const { lang, path, file } of PAGES) {
    // a saved language choice stops the redirect to the browser's language
    const { identifier } = await page("Page.addScriptToEvaluateOnNewDocument", {
      source: `localStorage.setItem("lang", ${JSON.stringify(lang)});`,
    });
    const loaded = cdp.once("Page.loadEventFired", sessionId);
    await page("Page.navigate", { url: BASE + path });
    await loaded;
    await page("Runtime.evaluate", {
      awaitPromise: true,
      expression: `(async () => {
        const style = document.createElement("style");
        style.textContent = ${JSON.stringify(CARD_CSS)};
        document.head.append(style);
        await document.fonts.ready;
        await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
        await new Promise(resolve => setTimeout(resolve, 300));
      })()`,
    });
    const { data } = await page("Page.captureScreenshot", { format: "png" });
    writeFileSync(new URL(file, OUT), Buffer.from(data, "base64"));
    await page("Page.removeScriptToEvaluateOnNewDocument", { identifier });
    process.stdout.write(`${BASE + path} → public/${file}\n`);
  }

  await cdp.send("Browser.close").catch(() => {});
} finally {
  browser.kill();
  rmSync(profile, { recursive: true, force: true });
}

/** A minimal DevTools protocol client over Node's built-in WebSocket. */
async function connect(url) {
  const ws = new WebSocket(url);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  let nextId = 0;
  const pending = new Map();
  const waiters = [];
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id !== undefined) {
      const call = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) call.reject(new Error(msg.error.message));
      else call.resolve(msg.result);
      return;
    }
    for (const w of waiters.filter(
      w => w.method === msg.method && w.sessionId === msg.sessionId
    )) {
      waiters.splice(waiters.indexOf(w), 1);
      w.resolve(msg.params);
    }
  };
  return {
    send(method, params = {}, sessionId) {
      const id = ++nextId;
      ws.send(JSON.stringify({ id, method, params, sessionId }));
      return new Promise((resolve, reject) =>
        pending.set(id, { resolve, reject })
      );
    },
    once(method, sessionId) {
      return new Promise(resolve =>
        waiters.push({ method, sessionId, resolve })
      );
    },
  };
}
