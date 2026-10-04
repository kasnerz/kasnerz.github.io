interface Social {
  name: string;
  nameCS?: string;
  href: string;
  icon: string;
  description: string;
  descriptionCS: string;
}

/**
 * Contact e-mail, base64-encoded so the address never appears in the HTML or
 * in this public repo as plain text. The contact page decodes it in the
 * browser only when someone points at or focuses the link.
 * Regenerate with: echo -n "name@domain" | base64
 */
export const MAIL_B64 = "emRlbmVrQGxva2FsbmkuYWk=";

/**
 * Cloudflare Turnstile site key — public, it ships in the HTML. The secret key is
 * the TURNSTILE_SECRET variable of the Pages project (functions/contact.ts).
 */
export const TURNSTILE_SITE_KEY = "0x4AAAAAAFN0N4XcvaK2bsfX";

export const SOCIALS: Social[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/zdenek-kasner/",
    icon: "tabler:brand-linkedin",
    description: "My online CV and professional network.",
    descriptionCS: "Můj online životopis a profesní síť.",
  },
  {
    name: "GitHub",
    href: "https://github.com/kasnerz",
    icon: "tabler:brand-github",
    description: "My software projects.",
    descriptionCS: "Moje softwarové výtvory.",
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/zdenekkasner.cz",
    icon: "tabler:brand-bluesky",
    description: "My research network and a source of comics.",
    descriptionCS: "Můj kontakt s výzkumným světem a zdroj komiksů.",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/zdenek.kasner/",
    icon: "tabler:brand-facebook",
    description: "For people I know personally.",
    descriptionCS: "Pro lidi, které znám osobně.",
  },
] as const;
