export interface TeachingTypeInfo {
    icon: string;
    label: {
        en: string;
        cs: string;
    };
}

export const teachingTypes: Record<string, TeachingTypeInfo> = {
    talk: {
        icon: "tabler:presentation",
        label: {
            en: "talk",
            cs: "přednáška",
        },
    },
    workshop: {
        icon: "tabler:users-group",
        label: {
            en: "workshop",
            cs: "workshop",
        },
    },
    video: {
        icon: "tabler:video",
        label: {
            en: "recording",
            cs: "nahrávka",
        },
    },
};

export interface TeachingItem {
    title: {
        en: string;
        cs: string;
    };
    period: {
        en: string;
        cs: string;
    };
    description: {
        en: string;
        cs: string;
    };
    image?: string;
    type?: keyof typeof teachingTypes;
    category: "current" | "talks" | "past";
    links?: {
        label: string;
        url: string;
        type: "website" | "github" | "youtube" | "materials" | "course" | "linkedin";
    }[];
}

export const teaching: TeachingItem[] = [
    {
        title: {
            en: "Neural Language Models",
            cs: "Neuronové jazykové modely",
        },
        period: {
            en: "25/26 Summer, 26/27 Summer",
            cs: "LS 25/26, LS 26/27",
        },
        description: {
            en: "I run a course on language models at FIT CTU, which I founded and designed myself. We start with the technical aspects of the Transformer architecture and pretrained models, then move on to current topics such as post-training, reasoning, agents, multimodality, efficiency, interpretability, and ethics.",
            cs: "Vedu předmět na FIT ČVUT zaměřený na jazykové modely. Kurz jsem sám založil a navrhnul. V kurzu začínáme od technických aspektů architektury Transformer a předtrénovaných modelů. Dále řešíme aktuální témata jako post-training, reasoning, agenti, multimodalita, efektivita, interpretabilita nebo etika.",
        },
        image: "/lectures/ctu.png",
        category: "current",
        links: [
            {
                label: "web",
                url: "https://courses.fit.cvut.cz/NI-NLM/index.html",
                type: "course",
            },
            {
                label: "slides",
                url: "/slides/public/ctu/",
                type: "materials",
            },
        ],
    },
    {
        title: {
            en: "How to train an AI model",
            cs: "Jak natrénovat AI model",
        },
        period: {
            en: "since 2026",
            cs: "od 2026",
        },
        description: {
            en: "I run a workshop for primary and secondary schools at Charles University's Didaktikon centre. Through a competition, quizzes and teamwork, we learn how today's AI models are trained.",
            cs: "Vedu workshop pro základní a střední školy v Didaktikonu UK. Formou soutěže, kvízů a práce v týmech se učíme, jak se trénují současné AI modely.",
        },
        image: "/lectures/didaktikon.jpg",
        category: "current",
        links: [
            {
                label: "Didaktikon",
                url: "https://didaktikon.cz/DIDAKT-123.html",
                type: "course",
            },
        ],
    },
    {
        title: {
            en: "Lokální AI: Reality check",
            cs: "Lokální AI: Reality check",
        },
        period: {
            en: "09/2026",
            cs: "09/2026",
        },
        description: {
            en: "Talk at AI Bootcamp on the state of open models.",
            cs: "Přednáška na AI Bootcampu o stavu otevřených modelů.",
        },
        type: "talk",
        category: "talks",
        links: [
            {
                label: "",
                url: "/slides/talks/ai-bootcamp-lokalni-modely/",
                type: "materials",
            },
            {
                label: "",
                url: "https://www.linkedin.com/posts/martin-zatkovic_a-je-to-tady-ai-bootcamp-je-ofici%C3%A1ln%C4%9B-za-activity-7507414512539463681-4WLO",
                type: "linkedin",
            },
        ],
    },
    {
        title: {
            en: "Zase o desetinku víc: Proč jsou LLM benchmarky (často) mimo realitu?",
            cs: "Zase o desetinku víc: Proč jsou LLM benchmarky (často) mimo realitu?",
        },
        period: {
            en: "03/2026",
            cs: "03/2026",
        },
        description: {
            en: "Talk at AI Bootcamp on the pitfalls of LLM benchmarks.",
            cs: "Přednáška na AI Bootcampu o úskalích LLM benchmarků.",
        },
        type: "talk",
        category: "talks",
        links: [
            {
                label: "",
                url: "/slides/talks/ai-bootcamp-benchmarks/",
                type: "materials",
            },
            {
                label: "",
                url: "https://www.linkedin.com/posts/martin-zatkovic_pr%C3%A1v%C4%9B-jsem-se-vr%C3%A1til-z-prvn%C3%ADho-ro%C4%8Dn%C3%ADku-ai-activity-7438999071194898433-04A4",
                type: "linkedin",
            },
        ],
    },
    {
        title: {
            en: "LLM, the security and everything",
            cs: "LLM, the security and everything",
        },
        period: {
            en: "02/2026",
            cs: "02/2026",
        },
        description: {
            en: "Invited talk for the Alef F5 AI Event.",
            cs: "Zvaná přednáška na akci Alef F5 AI Event.",
        },
        type: "talk",
        category: "talks",
        links: [
            {
                label: "",
                url: "https://www.linkedin.com/posts/alef-distribution-cz-s-r-o_ai-innovation-alef-activity-7427724355138273280-xRlB/",
                type: "linkedin",
            },
        ],
    },
    {
        title: {
            en: "Úvod do AI a principy fungování",
            cs: "Úvod do AI a principy fungování",
        },
        period: {
            en: "11/2025",
            cs: "11/2025",
        },
        description: {
            en: "Video course 'Generative AI Tools and Their Use in Studying' for the Faculty of Social Sciences, Charles University.",
            cs: "Videokurz 'Nástroje generativní AI a jejich využití při studiu' pro FSv UK.",
        },
        type: "video",
        category: "talks",
        links: [
            {
                label: "",
                url: "https://aiskilling.fsv.cuni.cz/uvod-do-ai/",
                type: "website",
            },
        ],
    },
    {
        title: {
            en: "Vibe coding: angličtina jako programovací jazyk",
            cs: "Vibe coding: angličtina jako programovací jazyk",
        },
        period: {
            en: "11/2025",
            cs: "11/2025",
        },
        description: {
            en: "Talk for high schools as part of the Dny.AI event.",
            cs: "Přednáška pro střední školy v rámci akce Dny.AI.",
        },
        type: "talk",
        category: "talks",
        links: [
            {
                label: "Dny.AI",
                url: "https://www.dny.ai/event/ai-for-talents-ii",
                type: "website",
            },
        ],
    },
    {
        title: {
            en: "LLM jako nástroj v příkazové řádce",
            cs: "LLM jako nástroj v příkazové řádce",
        },
        period: {
            en: "10/2025",
            cs: "10/2025",
        },
        description: {
            en: "Talk at Linux Days 2025.",
            cs: "Přednáška na akci Linux Days 2025.",
        },
        type: "talk",
        category: "talks",
        links: [
            {
                label: "",
                url: "https://www.youtube.com/watch?v=lE4GJH49vS4",
                type: "youtube",
            },
            {
                label: "",
                url: "https://pretalx.linuxdays.cz/linuxdays-2025/talk/LE8PBT/",
                type: "website",
            },
        ],
    },
    {
        title: {
            en: "Detecting Translation Errors with LLMs",
            cs: "Detecting Translation Errors with LLMs",
        },
        period: {
            en: "09/2025",
            cs: "09/2025",
        },
        description: {
            en: "Internal workshop for DGT @ European Commission.",
            cs: "Interní workshop pro DGT, oddělení Evropské komise.",
        },
        type: "workshop",
        category: "talks",
        links: [
        ],
    },
    {
        title: {
            en: "Constraining LLM Output",
            cs: "Constraining LLM Output",
        },
        period: {
            en: "09/2025",
            cs: "09/2025",
        },
        description: {
            en: "Internal lecture for Directorate-General for Translation (DGT).",
            cs: "Interní přednáška pro Directorate-General for Translation (DGT).",
        },
        type: "talk",
        category: "talks",
        links: [
        ],
    },
    {
        title: {
            en: "Evaluating Generated Texts in the Post-BLEU Era",
            cs: "Evaluating Generated Texts in the Post-BLEU Era",
        },
        period: {
            en: "11/2024",
            cs: "11/2024",
        },
        description: {
            en: "Invited talk for the Dublin City University NLP seminar.",
            cs: "Zvaná přednáška pro NLP seminář na Dublin City University.",
        },
        type: "talk",
        category: "talks",
        links: [
            {
                label: "",
                url: "https://docs.google.com/presentation/d/1uZfDQHGVwvWOptszpxrwuKkJKMZx1nPPLDhYbaVUIZI/edit?usp=sharing",
                type: "materials",
            },
        ],
    },
    {
        title: {
            en: "PracticalD2T",
            cs: "PracticalD2T",
        },
        period: {
            en: "09/2023",
            cs: "09/2023",
        },
        description: {
            en: "1st Workshop on Practical LLM-assisted Data-to-Text Generation.",
            cs: "Workshop na generování textu z dat pomocí velkých jazykových modelů.",
        },
        type: "workshop",
        category: "talks",
        links: [
            {
                label: "",
                url: "https://ufallab.ms.mff.cuni.cz/~kasner/practicald2t/",
                type: "website",
            },

        ],
    },
    {
        title: {
            en: "Large Language Models",
            cs: "Velké jazykové modely",
        },
        period: {
            en: "23/24 Summer, 24/25 Summer, 25/26 Summer",
            cs: "LS 23/24, LS 24/25, LS 25/26",
        },
        description: {
            en: "I helped shape a course on large language models run by my colleagues from ÚFAL. I led some of the lectures and helped prepare practical assignments.",
            cs: "Pomáhal jsem spolutvářet kurz o velkých jazykových modelech vedený kolegy z ÚFALu. Vedl jsem část přednášek a pomáhám s přípravou praktických úkolů.",
        },
        image: "/lectures/cuni-en.png",
        category: "past",
        links: [
            {
                label: "web",
                url: "https://ufal.mff.cuni.cz/courses/npfl140",
                type: "course",
            },
        ],
    },
    {
        title: {
            en: "Computational Creativity",
            cs: "Počítačová kreativita",
        },
        period: {
            en: "since 2024",
            cs: "od 2024",
        },
        description: {
            en: "I led a workshop for primary and secondary schools at Charles University's Didaktikon centre where we practically explored how generative image and text models work.",
            cs: "Vedl jsem workshop pro základní a střední školy v Didaktikonu UK, kde jsme si prakticky zkoušeli, jak fungují generativní modely obrázků a textu.",
        },
        image: "/lectures/didaktikon.jpg",
        category: "past",
        links: [
            {
                label: "Didaktikon",
                url: "https://didaktikon.cz/DIDAKT-123.html",
                type: "course",
            },
        ],
    },
    {
        title: {
            en: "Machine Learning for Greenhorns",
            cs: "Strojové učení pro zelenáče",
        },
        period: {
            en: "23/24 Winter, 24/25 Winter",
            cs: "ZS 23/24, ZS 24/25",
        },
        description: {
            en: "I was a TA for Machine Learning for Greenhorns, a course which is officially called 'Introduction to Machine Learning in Python' and covers the basics of machine learning for bachelor students. I was teaching the English lab and helping the students with homework assignments.",
            cs: "Působil jsem jako cvičící pro předmět Strojové učení pro zelenáče (oficiálně Úvod do strojového učení v Pythonu), který pokrývá základy strojového učení pro bakalářské studenty. Vedl jsem anglická cvičení a pomáhal studentům s domácími úkoly.",
        },
        image: "/lectures/cuni-en.png",
        category: "past",
        links: [
            {
                label: "NPFL129",
                url: "https://ufal.mff.cuni.cz/courses/npfl129",
                type: "course",
            },
        ],
    },
    {
        title: {
            en: "Statistical Dialogue Systems",
            cs: "Statistické dialogové systémy",
        },
        period: {
            en: "22/23 Winter-now",
            cs: "ZS 22/23-teď",
        },
        description: {
            en: "In 22/23, I was helping with grading homework assignments. I regularly teach the lecture on natural language generation since then.",
            cs: "V zimním semestru 22/23 jsem pomáhal s hodnocením domácích úkolů, od té doby pravidelně vedu přednášku o generování přirozeného jazyka.",
        },
        image: "/lectures/cuni-en.png",
        category: "past",
        links: [
            {
                label: "NPFL099",
                url: "https://ufal.mff.cuni.cz/courses/npfl099",
                type: "course",
            },
        ],
    },
    {
        title: {
            en: "Introduction to Linux",
            cs: "Úvod do Linuxu",
        },
        period: {
            en: "21/22 Summer",
            cs: "LS 21/22",
        },
        description: {
            en: "I was teaching a lab for Introduction to Linux in Czech. We used the inverted lecture system – instead of lectures, the students had a '<i>before-class reading</i>' which we built upon during the lab.",
            cs: "Vedl jsem cvičení k Úvodu do Linuxu. Používali jsme systém obrácené výuky – místo přednášek měli studenti '<i>before-class reading</i>', na kterém jsme stavěli během cvičení.",
        },
        image: "/lectures/cuni-en.png",
        category: "past",
        links: [
            {
                label: "NSWI177",
                url: "https://d3s.mff.cuni.cz/teaching/nswi177/",
                type: "course",
            },
        ],
    },
    {
        title: {
            en: "Introduction to Algorithms + Programming 1",
            cs: "Úvod do algoritmizace + Programování 1",
        },
        period: {
            en: "20/21 Winter",
            cs: "ZS 20/21",
        },
        description: {
            en: "I was teaching a lab for Introduction to Algorithms and Programming 1 in Czech via Zoom. Didn't expect my first class to be virtual, but finding ways to make it work was a nice challenge!",
            cs: "Vedl jsem cvičení k Úvodu do algoritmizace a Programování 1 přes Zoom. Nečekal jsem, že moje první výuka bude virtuální, ale byla to zajímavá výzva!",
        },
        image: "/lectures/cuni-en.png",
        category: "past",
        links: [
            {
                label: "NPRG062",
                url: "https://is.cuni.cz/studium/predmety/index.php?do=predmet&kod=NPRG062",
                type: "course",
            },
            {
                label: "NPRG030",
                url: "https://is.cuni.cz/studium/predmety/index.php?do=predmet&kod=NPRG030",
                type: "course",
            },
            {
                label: "Materials",
                url: "https://github.com/kasnerz/nprg030_2020",
                type: "github",
            },
        ],
    },
];
