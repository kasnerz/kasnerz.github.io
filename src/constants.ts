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
    href: "https://bsky.app/profile/zdenekkasner.bsky.social",
    linkTitle: `${SITE.title} on Bluesky`,
    icon: "tabler:brand-bluesky",
    description: "My research network, a source of comics, and a replacement for ✝ Twitter.",
    descriptionCS: "Můj kontakt s výzkumným světem, zdroj komiksů a náhrada za ✝ Twitter.",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/zdenek.kasner/",
    linkTitle: `${SITE.title} on Facebook`,
    icon: "tabler:brand-facebook",
    description: "For people I know personally.",
    descriptionCS: "Pro lidi, které znám osobně."
  },
  {
    name: "University website",
    nameCS: "Univerzitní web",
    href: "https://ufal.mff.cuni.cz/zdenek-kasner",
    linkTitle: `${SITE.title} on Charles University website`,
    icon: "tabler:building-bank",
    description: "Details about my work at ÚFAL, including my work email.",
    descriptionCS: "Detaily o mém působení na ÚFALu, včetně pracovního mailu."
  },
  {
    name: "Google Scholar",
    href: "https://scholar.google.cz/citations?user=6NnuRB8AAAAJ&hl=cs",
    linkTitle: `${SITE.title} on Google Scholar`,
    icon: "tabler:school",
    description: "List of my academic publications.",
    descriptionCS: "Seznam mých odborných publikací."
  },
] as const;

export const SHARE_LINKS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    icon: "tabler:brand-whatsapp",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    icon: "tabler:brand-facebook",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/intent/tweet?url=",
    linkTitle: `Tweet this post`,
    icon: "tabler:brand-twitter",
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: "tabler:brand-telegram",
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    icon: "tabler:brand-pinterest",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/sharing/share-offsite/?url=",
    linkTitle: `Share this post on LinkedIn`,
    icon: "tabler:brand-linkedin",
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/submit?url=",
    linkTitle: `Share this post on Reddit`,
    icon: "tabler:brand-reddit",
  },
  {
    name: "Skype",
    href: "https://web.skype.com/share?url=",
    linkTitle: `Share this post via Skype`,
    icon: "tabler:brand-skype",
  },
  {
    name: "Email",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: "tabler:mail",
  },
] as const;

