/**
 * Cloudflare Turnstile verification for the contact endpoint. The underscore
 * prefix keeps Cloudflare Pages from routing this file as an endpoint; it's a
 * plain importable module.
 *
 * The matching public site key lives in src/constants.ts (TURNSTILE_SITE_KEY)
 * and renders the widget, which injects a `cf-turnstile-response` token into the
 * form. The endpoint hands that token here to confirm the submission is human
 * before sending any mail.
 */

interface SiteVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

/**
 * Verify a Turnstile token against Cloudflare's siteverify API.
 * Returns true only when Cloudflare affirmatively reports success; any missing
 * token, network error, or malformed response is treated as a failure.
 */
export async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string,
): Promise<boolean> {
  if (!token) return false;

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    const data = (await res.json()) as SiteVerifyResponse;
    return data.success === true;
  } catch {
    return false;
  }
}
