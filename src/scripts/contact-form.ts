// Contact page behaviour: AJAX submit of the contact form to the Pages Function
// at /contact (functions/contact.ts), the Turnstile bot check, and the
// obfuscated e-mail link. Everything is delegated to the document or re-run on
// astro:page-load, because the ClientRouter runs this module only once. The
// form carries data-astro-reload so the ClientRouter leaves its submit to us.

declare global {
  interface Window {
    turnstile?: {
      render(el: HTMLElement, options: Record<string, unknown>): string;
      reset(widgetId?: string): void;
    };
  }
}

// --- E-mail link -------------------------------------------------------------
// The address sits base64-encoded in data-mail and becomes a mailto: only when
// a person points at, focuses or touches the link.
function revealMail(event: Event) {
  const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>(
    "a[data-mail]"
  );
  if (link?.dataset.mail) {
    link.href = `mailto:${atob(link.dataset.mail)}`;
    delete link.dataset.mail;
  }
}
for (const type of ["pointerover", "focusin", "touchstart"]) {
  document.addEventListener(type, revealMail, { passive: true });
}

// --- Turnstile ---------------------------------------------------------------
// Explicit rendering: implicit mode only scans the page once when the script
// loads, which misses a form reached by client-side navigation.
let turnstileLoad: Promise<void> | undefined;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  turnstileLoad ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.onload = () => resolve();
    s.onerror = () => {
      turnstileLoad = undefined;
      reject();
    };
    document.head.appendChild(s);
  });
  return turnstileLoad;
}

async function renderWidgets() {
  const widgets = document.querySelectorAll<HTMLElement>(
    ".cf-turnstile:not([data-widget-id])"
  );
  if (!widgets.length) return;
  try {
    await loadTurnstile();
  } catch {
    return; // the server rejects the submit with a readable message
  }
  widgets.forEach(el => {
    el.dataset.widgetId = window.turnstile!.render(el, {
      sitekey: el.dataset.sitekey,
      theme: "light",
      appearance: "interaction-only",
    });
  });
}
document.addEventListener("astro:page-load", renderWidgets);

// --- Form submit -------------------------------------------------------------
document.addEventListener("submit", async event => {
  const form = event.target as HTMLFormElement;
  if (!form.matches("form[data-contact]")) return;
  event.preventDefault();

  const status = form.querySelector<HTMLElement>(".status")!;
  const button = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
  const errors = JSON.parse(form.dataset.errors ?? "{}") as Record<
    string,
    string
  >;

  const show = (message: string, ok: boolean) => {
    status.textContent = message;
    status.classList.toggle("is-ok", ok);
    status.classList.toggle("is-error", !ok);
    status.hidden = false;
  };

  status.hidden = true;
  button.disabled = true;
  try {
    const payload = Object.fromEntries(new FormData(form).entries());
    const res = await fetch(form.action, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };
    // Require the function's own reply: a static host answers the POST with
    // the page itself and a 200.
    if (res.ok && data.ok) {
      form.reset();
      show(form.dataset.success ?? "OK", true);
    } else {
      show(errors[data.error ?? ""] ?? errors.fail, false);
    }
  } catch {
    show(errors.fail, false);
  } finally {
    button.disabled = false;
    // Turnstile tokens are single-use; get a fresh one for the next submit.
    const widget = form.querySelector<HTMLElement>(".cf-turnstile");
    if (widget?.dataset.widgetId)
      window.turnstile?.reset(widget.dataset.widgetId);
  }
});

// Makes this file a module, which `declare global` above requires.
export {};
