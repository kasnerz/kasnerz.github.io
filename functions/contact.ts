/**
 * Cloudflare Pages Function — contact form endpoint (POST /contact).
 *
 * Emails the submitted message to my inbox via Resend's transactional send
 * API. Name, e-mail and company are optional, so people can write anonymously;
 * only the message is required. Errors come back as short codes that the page
 * translates (src/components/ContactPage.astro).
 *
 * Bindings / environment variables (Cloudflare Pages → Settings):
 *   resend_api_key   — Resend API key (Secrets Store binding) with `email:send`
 *   CONTACT_TO       — inbox that receives messages
 *   CONTACT_FROM     — verified Resend sender, e.g. "Web <zdenek@lokalni.ai>"
 *   TURNSTILE_SECRET — Turnstile secret; when set, a valid token is required
 */

import { verifyTurnstile } from "./_turnstile";

/** A Cloudflare Secrets Store binding (async) or a plain string (local dev). */
type Secret = string | { get(): Promise<string> };

interface Env {
  resend_api_key: Secret;
  CONTACT_TO: string;
  CONTACT_FROM: string;
  TURNSTILE_SECRET?: Secret;
}

interface RequestContext {
  request: Request;
  env: Env;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

/** Read a secret whether it's a Secrets Store binding or a plain env string. */
async function readSecret(secret: Secret | undefined): Promise<string> {
  if (!secret) return "";
  return typeof secret === "string" ? secret : await secret.get();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const onRequestPost = async (
  context: RequestContext
): Promise<Response> => {
  const { request, env } = context;

  const apiKey = await readSecret(env.resend_api_key);
  if (!apiKey || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json({ error: "fail" }, 500);
  }

  // Accept a JSON body (our fetch path) or a classic form POST (no-JS fallback).
  const fields: Record<string, string> = {};
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const body = (await request.json()) as Record<string, unknown>;
      for (const [key, val] of Object.entries(body)) {
        fields[key] = String(val ?? "").trim();
      }
    } else {
      const form = await request.formData();
      for (const [key, val] of form.entries()) {
        fields[key] = String(val ?? "").trim();
      }
    }
  } catch {
    return json({ error: "fail" }, 400);
  }

  // Honeypot tripped — a bot filled the hidden field. Drop it, fake success.
  if (fields.website) return json({ ok: true });

  // Bot check. Enforced only when a secret is configured, so the form keeps
  // working until Turnstile is fully set up; once set, a valid token is required.
  const turnstileSecret = await readSecret(env.TURNSTILE_SECRET);
  if (turnstileSecret) {
    const ip = request.headers.get("CF-Connecting-IP") ?? "";
    const ok = await verifyTurnstile(
      fields["cf-turnstile-response"] ?? "",
      turnstileSecret,
      ip
    );
    if (!ok) return json({ error: "bot" }, 400);
  }

  const name = (fields.name ?? "").slice(0, 200);
  const email = (fields.email ?? "").slice(0, 200);
  const company = (fields.company ?? "").slice(0, 200);
  const purpose = (fields.purpose ?? "").slice(0, 100) || "—";
  const lang = fields.lang === "en" ? "en" : "cs";
  const message = (fields.message ?? "").slice(0, 10000);

  if (!message) return json({ error: "missing" }, 400);
  if (email && !EMAIL_RE.test(email)) return json({ error: "email" }, 400);

  const sender = name || email || "anonym";
  const subject = `zdenekkasner.cz — ${purpose} (${sender})`;
  const rows: [string, string][] = [
    ["Jméno", name || "—"],
    ["E-mail", email || "—"],
    ["Firma", company || "—"],
    ["Účel", purpose],
    ["Jazyk", lang],
  ];
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${message}\n`;
  const html =
    `<p>${rows.map(([k, v]) => `<strong>${k}:</strong> ${escapeHtml(v)}`).join("<br>")}</p>` +
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO,
      // Only when the sender left an address, so "Reply" in the inbox works.
      ...(email ? { reply_to: email } : {}),
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) return json({ error: "fail" }, 502);

  return json({ ok: true });
};
