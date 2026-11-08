/**
 * Featured posts from the Lokální.AI blog, shown on /blog.
 *
 * Titles, descriptions, levels and reading times are copied from
 * https://lokalni.ai/blog; English versions are my translations (the posts
 * themselves are Czech only). `icon` is the inner markup of the post's own icon
 * on lokalni.ai, drawn in a 64×72 box with a 1.4 stroke (see BLOG_ICON_SVG).
 */

export const BLOG_URL = "https://lokalni.ai";
export const BLOG_RSS = "https://lokalni.ai/rss.xml";
export const BLOG_NEWSLETTER = "https://lokalni.ai/#newsletter";
export const BLOG_DISCORD = "https://discord.gg/xUcsVN93Nb";

/** Attributes of the <svg> wrapping each icon, identical to lokalni.ai. */
export const BLOG_ICON_SVG = {
  viewBox: "0 0 64 72",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
} as const;

type Text = { cs: string; en: string };

export type Level = "beginner" | "advanced" | "expert";

export const LEVELS: Record<Level, Text> = {
  beginner: { cs: "začátečník", en: "beginner" },
  advanced: { cs: "pokročilý", en: "advanced" },
  expert: { cs: "expert", en: "expert" },
};

export interface BlogPost {
  slug: string;
  title: Text;
  description: Text;
  level: Level;
  minutes: number;
  icon: string;
}

export const postUrl = (post: BlogPost) => `${BLOG_URL}/blog/${post.slug}/`;

export const featuredPosts: BlogPost[] = [
  {
    slug: "jak-vybrat-jazykovy-model",
    title: {
      cs: "Jak vybrat jazykový model?",
      en: "How to choose a language model?",
    },
    description: {
      cs: "Stopařův průvodce po Huggingface, aneb čím vším se řídit, když nasazujete jazykový model?",
      en: "A hitchhiker's guide to Hugging Face: what to look at when you deploy a language model.",
    },
    level: "advanced",
    minutes: 21,
    icon: `<path d="M29 10V4H35V10"/>
  <path d="M11 10H46L54 19L46 28H11A3 3 0 0 1 8 25V13A3 3 0 0 1 11 10Z"/>
  <path d="M15 19H37"/>
  <path d="M29 28V34M35 28V34"/>
  <path d="M11 34H46L54 43L46 52H11A3 3 0 0 1 8 49V37A3 3 0 0 1 11 34Z"/>
  <path d="M15 43H37"/>
  <path d="M29 52V68M35 52V68"/>
  <path d="M21 68H43"/>`,
  },
  {
    slug: "necenzurovane-modely",
    title: {
      cs: "Necenzurované modely jako legitimní nástroj",
      en: "Uncensored models as a legitimate tool",
    },
    description: {
      cs: "Proč AI asistenti (ne)spolupracují, proč švýcarský nejvyšší soud využívá Heretic modely, a proč hranice mezi dobrým a zlým úmyslem je často velmi tenká.",
      en: "Why AI assistants (don't) cooperate, why the Swiss Federal Supreme Court uses Heretic models, and why the line between good and bad intent is often very thin.",
    },
    level: "expert",
    minutes: 17,
    icon: `<path d="M12 30V22A10 10 0 0 1 32 22V30"/>
  <rect x="4" y="30" width="36" height="30" rx="4"/>
  <rect x="20.5" y="39.5" width="3" height="11" rx="1.5"/>
  <path d="M23.5 45H49M28 45V49M32 45V48"/>
  <circle cx="55" cy="45" r="6"/>
  <circle cx="55" cy="45" r="1.8"/>`,
  },
  {
    slug: "hardware-na-pracovni-stul",
    title: {
      cs: "Provozujeme AI lokálně: Hardware na pracovní stůl",
      en: "Running AI locally: Hardware for your desk",
    },
    description: {
      cs: "Jak provozovat středně velké modely pro potřeby kanceláře nebo menší firmy? Vyplatí se investovat do AI pracovní stanice, nebo spíše do dedikované GPU?",
      en: "How to run mid-sized models for an office or a small company? Is it worth investing in an AI workstation, or rather in a dedicated GPU?",
    },
    level: "expert",
    minutes: 18,
    icon: `<rect x="9" y="6" width="36" height="25" rx="3"/>
  <circle cx="19" cy="18.5" r="3.2"/>
  <path d="M27 18.5H36"/>
  <path d="M24 31L22.5 39M30 31L31.5 39"/>
  <rect x="3" y="39" width="58" height="6" rx="2"/>
  <path d="M10 45V68M54 45V68"/>`,
  },
];

export interface FeedSummary {
  articles: number;
  newsletters: number;
  latest: { title: string; url: string; date: Date };
}

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();

async function fetchFeedSummary(): Promise<FeedSummary | null> {
  try {
    const res = await fetch(BLOG_RSS, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => {
      const tag = (name: string) =>
        decode(
          m[1].match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? ""
        );
      return {
        title: tag("title"),
        url: tag("link"),
        date: new Date(tag("pubDate")),
        newsletter: tag("category") === "newsletter",
      };
    });
    const dated = items.filter(i => i.title && !isNaN(i.date.getTime()));
    if (dated.length === 0) throw new Error("no items");
    dated.sort((a, b) => b.date.getTime() - a.date.getTime());
    const newsletters = dated.filter(i => i.newsletter).length;
    const [latest] = dated;
    return {
      articles: dated.length - newsletters,
      newsletters,
      latest: { title: latest.title, url: latest.url, date: latest.date },
    };
  } catch (err) {
    // eslint-disable-next-line no-console -- a visible note in the build log
    console.warn(`[blog] RSS summary skipped: ${String(err)}`);
    return null;
  }
}

let cached: Promise<FeedSummary | null> | undefined;

/** Counts from the blog's RSS, fetched once per build; null when the fetch fails. */
export const getFeedSummary = () => (cached ??= fetchFeedSummary());
