export type Lang = "en" | "cs";

export type PageId =
  | "consulting"
  | "blog"
  | "teaching"
  | "projects"
  | "research"
  | "about";

export interface NavItem {
  id: PageId;
  label: Record<Lang, string>;
  /** Shown under the page title in the subpage header. */
  subtitle?: Record<Lang, string>;
  /** Internal path without the language prefix. */
  path?: string;
  /** External target; opens in the same tab and is marked with ↗. */
  href?: string;
}

// Order matters: it is the left-to-right order of the figures.
export const NAV: NavItem[] = [
  {
    id: "consulting",
    label: { en: "Consulting", cs: "Konzultuji" },
    subtitle: {
      en: "I help teams put AI to work",
      cs: "Pomáhám týmům zapojit AI do práce",
    },
    path: "/consulting",
  },
  {
    id: "teaching",
    label: { en: "Teaching", cs: "Učím" },
    subtitle: {
      en: "I lecture, teach and run workshops",
      cs: "Přednáším, učím, vedu workshopy",
    },
    path: "/teaching",
  },
  {
    id: "projects",
    label: { en: "Building", cs: "Tvořím" },
    subtitle: { en: "My projects", cs: "Moje projekty" },
    path: "/projects",
  },
  {
    id: "research",
    label: { en: "Researching", cs: "Zkoumám" },
    subtitle: {
      en: "Natural language processing research",
      cs: "Výzkum zpracování přirozeného jazyka",
    },
    path: "/research",
  },
  {
    id: "blog",
    label: { en: "Blogging", cs: "Bloguji" },
    href: "https://lokalni.ai/blog",
  },
  {
    id: "about",
    label: { en: "Living", cs: "Žiju" },
    subtitle: { en: "Welcome!", cs: "Vítej!" },
    path: "/about",
  },
];

export function getNavItem(id: PageId): NavItem {
  const item = NAV.find(n => n.id === id);
  if (!item) throw new Error(`Unknown page id: ${id}`);
  return item;
}

export function navHref(item: NavItem, lang: Lang): string {
  if (item.href) return item.href;
  return lang === "cs" ? `/cs${item.path}` : item.path!;
}
