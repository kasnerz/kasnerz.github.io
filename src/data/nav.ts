export type Lang = "en" | "cs";

export type PageId =
  | "consulting"
  | "teaching"
  | "projects"
  | "research"
  | "blog"
  | "about";

export interface NavItem {
  id: PageId;
  label: Record<Lang, string>;
  /** Continues the label under the front-page figure ("Teaching" → "at CTU and CU"). */
  tagline: Record<Lang, string>;
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
    label: { en: "Consulting", cs: "Konzultant" },
    tagline: {
      en: "on deploying local AI models",
      cs: "nasazení lokálních AI modelů",
    },
    subtitle: {
      en: "I help teams put AI to work",
      cs: "Pomáhám týmům zapojit AI do práce",
    },
    path: "/consulting",
  },
  {
    id: "teaching",
    label: { en: "Teaching", cs: "Lektor" },
    tagline: {
      en: "university lecturing, workshops",
      cs: "přednáším, učím, vedu workshopy",
    },
    subtitle: {
      en: "I lecture, teach and run workshops",
      cs: "Přednáším, učím, vedu workshopy",
    },
    path: "/teaching",
  },
  {
    id: "projects",
    label: { en: "Developing", cs: "Vývojář" },
    tagline: { en: "open-source software", cs: "open-source software" },
    subtitle: { en: "My software projects", cs: "Moje softwarové projekty" },
    path: "/projects",
  },
  {
    id: "research",
    label: { en: "Researching", cs: "Výzkumník" },
    tagline: { en: "generative AI models", cs: "generativních AI modelů" },
    subtitle: {
      en: "Natural language processing research",
      cs: "Výzkum zpracování přirozeného jazyka",
    },
    path: "/research",
  },
  {
    id: "blog",
    label: { en: "Blogging", cs: "Blogger" },
    tagline: { en: "at Lokální.AI", cs: "na Lokální.AI" },
    subtitle: { en: "Writing about local AI", cs: "Píšu o lokální AI" },
    path: "/blog",
  },
  {
    id: "about",
    label: { en: "Person", cs: "Člověk" },
    tagline: { en: "with lots of interests", cs: "se spoustou zájmů" },
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
