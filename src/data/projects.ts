export interface Project {
    title: string;
    url: string;
    image: string;
    description: {
        en: string;
        cs: string;
    };
}

/** Representative software projects, shown on the developer page. */
export const projects: Project[] = [
    {
        title: "AnimatedLLM",
        url: "https://animatedllm.github.io/",
        description: {
            en: "A website full of interactive animations where you can yourself on how LLMs work under the hood.",
            cs: "Vzdělávací web s interaktivními animacemi velkých jazykových modelů.",
        },
        image: "/projects/animated-llm.png",
    },
    {
        title: "factgenie",
        url: "https://github.com/ufal/factgenie",
        description: {
            en: "A lightweight self-hosted web span annotation tool.",
            cs: "Jednoduchý self-hosted nástroj pro anotaci textů.",
        },
        image: "/projects/factgenie.png",
    },
    {
        title: "reffix",
        url: "https://github.com/kasnerz/reffix",
        description: {
            en: "A Python CLI tool for improving the BibTeX list of references.",
            cs: "Pythoní nástroj do příkazové řádky pro vylepšování BibTeX  referencí.",
        },
        image: "/projects/reffix.png",
    },
];

/** Personal side projects, shown on the about page. */
export const personalProjects: Project[] = [
    {
        title: "multiling-o-cs",
        url: "https://github.com/kasnerz/multiling-o-cs",
        description: {
            en: "My custom configuration files for the Multiling-o keyboard.",
            cs: "Moje vlastní konfigurační soubory pro klávesnici Multiling-o.",
        },
        image: "/projects/multiling-o-cs.png",
    },
    {
        title: "songbook",
        url: "https://github.com/kasnerz/songbook",
        description: {
            en: "My personal guitar songbook.",
            cs: "Můj osobní kytarový zpěvník.",
        },
        image: "/projects/songbook.png",
    },
];
