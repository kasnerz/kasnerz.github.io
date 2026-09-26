export const languages = {
    en: "English",
    cs: "Čeština",
};

export const defaultLang = "en";
export const showDefaultLang = false;

// Section names and subtitles live in src/data/nav.ts.
export const ui = {
    en: {
        "home.tagline": "AI minimalist",
        "nav.main": "Main navigation",
        "menu.open": "Open menu",
        "menu.close": "Close menu",
        "menu.label": "Menu",
        "tools.theme": "Toggle light and dark",
        "404.title": "Page Not Found",
        "404.button": "Go back home",
        "projects.description": "Here you can browse through some of my open-source projects.",
        "projects.more": "You can find more on my {github}.",
        "teaching.slides": "Slides",
        "teaching.slides.before": "You can my public slides here:",
        "teaching.current": "Currently teaching",
        "teaching.talks": "Talks & workshops",
        "teaching.past": "Past courses",
    },
    cs: {
        "home.tagline": "AI minimalista",
        "nav.main": "Hlavní navigace",
        "menu.open": "Otevřít menu",
        "menu.close": "Zavřít menu",
        "menu.label": "Menu",
        "tools.theme": "Přepnout světlý a tmavý režim",
        "404.title": "Stránka nenalezena",
        "404.button": "Zpět domů",
        "projects.description": "Zde je na ukázku několik mých open-source projektů.",
        "projects.more": "Více jich najdete na mém {github}u.",
        "teaching.slides": "Slidy",
        "teaching.slides.before": "Mé veřejné slidy najdete tady:",
        "teaching.current": "Právě učím",
        "teaching.talks": "Přednášky a workshopy",
        "teaching.past": "V minulost jsem učil...",
    },
} as const;
