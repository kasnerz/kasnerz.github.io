import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
import IconPinterest from "@/assets/icons/IconPinterest.svg";
import IconBrandBluesky from "@/assets/icons/IconBrandBluesky.svg";
import IconBuildingBank from "@/assets/icons/IconBuildingBank.svg";
import IconGoogleScholar from "@/assets/icons/IconGoogleScholar.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/kasnerz",
    linkTitle: `${SITE.title} on GitHub`,
    icon: IconGitHub,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/zdenek.kasner/",
    linkTitle: `${SITE.title} on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/zdenek-kasner/",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/zdenekkasner.bsky.social",
    linkTitle: `${SITE.title} on Bluesky`,
    icon: IconBrandBluesky,
  },
  {
    name: "University",
    href: "https://ufal.mff.cuni.cz/zdenek-kasner",
    linkTitle: `${SITE.title} on Charles University website`,
    icon: IconBuildingBank,
  },
  {
    name: "Google Scholar",
    href: "https://scholar.google.cz/citations?user=6NnuRB8AAAAJ&hl=cs",
    linkTitle: `${SITE.title} on Google Scholar`,
    icon: IconGoogleScholar,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    icon: IconWhatsapp,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    icon: IconPinterest,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    icon: IconMail,
  },
] as const;
