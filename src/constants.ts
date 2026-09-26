import { SITE } from "@/config";

interface Social {
  name: string;
  nameCS?: string;
  href: string;
  linkTitle: string;
  icon: string;
  description: string;
  descriptionCS: string;
  /** Leave out of the front-page icon row; still listed on the About page. */
  hideIcon?: boolean;
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
    descriptionCS: "Pro lidi, které znám osobně."
  },
  {
    name: "University website",
    nameCS: "Univerzitní web",
    href: "https://ufal.mff.cuni.cz/zdenek-kasner",
    linkTitle: `${SITE.title} on Charles University website`,
    icon: "tabler:building-bank",
    hideIcon: true,
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
