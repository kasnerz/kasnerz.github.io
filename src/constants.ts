import { SITE } from "@/config";

interface Social {
  name: string;
  nameCS?: string;
  href: string;
  linkTitle: string;
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
 * Cloudflare Turnstile site key — public, it ships in the HTML. Shared with the
 * lokalni.ai widget, which lists zdenekkasner.cz among its hostnames. The secret
 * key is the TURNSTILE_SECRET variable of the Pages project (functions/contact.ts).
 */
export const TURNSTILE_SITE_KEY = "0x4AAAAAADqTdUclBHOPJdIs";

export const SOCIALS: Social[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/zdenek-kasner/",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: "tabler:brand-linkedin",
    description: "My online CV and professional network.",
    descriptionCS: "Můj online životopis a profesní síť.",
  },
  {
    name: "GitHub",
    href: "https://github.com/kasnerz",
    linkTitle: `${SITE.title} on GitHub`,
    icon: "tabler:brand-github",
    description: "My software projects.",
    descriptionCS: "Moje softwarové výtvory.",
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/zdenekkasner.cz",
    linkTitle: `${SITE.title} on Bluesky`,
    icon: "tabler:brand-bluesky",
    description: "My research network and a source of comics.",
    descriptionCS: "Můj kontakt s výzkumným světem a zdroj komiksů.",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/zdenek.kasner/",
    linkTitle: `${SITE.title} on Facebook`,
    icon: "tabler:brand-facebook",
    description: "For people I know personally.",
    descriptionCS: "Pro lidi, které znám osobně.",
  },
] as const;
