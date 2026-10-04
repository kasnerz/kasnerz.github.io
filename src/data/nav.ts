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
  /** Short noun shown under the figure on the front page and in the top bar. */
  label: Record<Lang, string>;
  /** Verb heading of the section's own page ("Developer" → "I create"). */
  heading: Record<Lang, string>;
  /** Shown under the label on the front page ("Developer" → "of open-source software"). */
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
    label: { en: "Consultant", cs: "Konzultant" },
    heading: { en: "I analyze and deploy", cs: "Analyzuji a nasazuji" },
    tagline: {
      en: "on deploying local AI models",
      cs: "nasazení lokálních AI modelů",
    },
    subtitle: {
      en: "Local AI solutions.",
      cs: "Lokální AI řešení.",
    },
    path: "/consulting",
  },
  {
    id: "teaching",
    label: { en: "Lecturer", cs: "Lektor" },
    heading: { en: "I speak in public", cs: "Veřejně vystupuji" },
    tagline: {
      en: "lecturing, teaching, running workshops",
      cs: "přednáším, učím, vedu workshopy",
    },
    subtitle: {
      en: "Lecturing, teaching, running workshops.",
      cs: "Přednáším, učím, vedu workshopy.",
    },
    path: "/teaching",
  },
  {
    id: "projects",
    label: { en: "Developer", cs: "Vývojář" },
    heading: { en: "I create", cs: "Tvořím" },
    tagline: { en: "of open-source software", cs: "open-source softwaru" },
    subtitle: { en: "Software projects.", cs: "Softwarové projekty." },
    path: "/projects",
  },
  {
    id: "research",
    label: { en: "Researcher", cs: "Výzkumník" },
    heading: { en: "I do research", cs: "Zkoumám" },
    tagline: {
      en: "in large language models",
      cs: "velkých jazykových modelů",
    },
    subtitle: {
      en: "On large language models.",
      cs: "Velké jazykové modely.",
    },
    path: "/research",
  },
  {
    id: "blog",
    label: { en: "Blogger", cs: "Blogger" },
    heading: { en: "I blog", cs: "Píšu blog" },
    tagline: { en: "on the Lokální.AI portal", cs: "na portálu Lokální.AI" },
    subtitle: {
      en: "On open-weight AI models.",
      cs: "O otevřených AI modelech.",
    },
    path: "/blog",
  },
  {
    id: "about",
    label: { en: "Person", cs: "Člověk" },
    heading: { en: "I am", cs: "Jsem" },
    tagline: { en: "with many interests", cs: "se spoustou zájmů" },
    subtitle: {
      en: "A curious person with many interests.",
      cs: "Zvědavý člověk se spoustou zájmů.",
    },
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
