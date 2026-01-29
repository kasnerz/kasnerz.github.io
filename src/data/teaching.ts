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
    image: string;
    category: "current" | "talks" | "past";
    links?: {
        label: string;
        url: string;
        type: "website" | "github" | "youtube" | "materials" | "course";
    }[];
}

export const teaching: TeachingItem[] = [
    {
        title: {
            en: "Neural Language Models",
            cs: "Neuronové jazykové modely",
        },
        period: {
            en: "25/26 Summer",
            cs: "LS 25/26",
        },
        description: {
            en: "TBA.",
            cs: "TBA.",
        },
        image: "/lectures/ctu.png",
        category: "current",
        links: [
            {
                label: "NI-NLM",
                url: "https://courses.fit.cvut.cz/NI-NLM/index.html",
                type: "course",
            },
        ],
    },
    {
        title: {
            en: "Large Language Models",
            cs: "Velké jazykové modely",
        },
        period: {
            en: "23/24 Summer, 24/25 Summer",
            cs: "LS 23/24, LS 24/25",
        },
        description: {
            en: "I am helping to shape our new course on Transformer-based large language models. After the brief introduction of the Transformer architecture, we focus on various practical aspects of language modeling. We also put emphasis on group assignments and reading research papers. In the past years, I lead several lectures and helped with preparing practical assigments.",
            cs: "Pomáhám utvářet náš nový kurz o velkých jazykových modelech založených na architektuře Transformer. Po stručném úvodu do architektury se zaměřujeme na různé praktické aspekty jazykového modelování. Důraz klademe také na skupinové úkoly a čtení výzkumných prací. V minulých letech jsem vedl několik přednášek a pomáhal s přípravou praktických úkolů.",
        },
        image: "/lectures/cuni-en.png",
        category: "current",
        links: [
            {
                label: "NPFL140",
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
            en: "TBA",
            cs: "TBA",
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
            en: "Machine Learning for Greenhorns",
            cs: "Strojové učení pro začátečníky",
        },
        period: {
            en: "23/24 Winter, 24/25 Winter",
            cs: "ZS 23/24, ZS 24/25",
        },
        description: {
            en: "I was a TA for Machine Learning for Greenhorns, a course which is officially called 'Introduction to Machine Learning with Python' and covers the basics of machine learning for bachelor students. I was teaching the English lab and helping the students with homework assignments.",
            cs: "Působil jsem jako cvičící pro předmět Strojové učení pro začátečníky (oficiálně Úvod do strojového učení s Pythonem), který pokrývá základy strojového učení pro bakalářské studenty. Vedl jsem anglická cvičení a pomáhal studentům s domácími úkoly.",
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
            en: "22/23 Winter",
            cs: "ZS 22/23",
        },
        description: {
            en: "I was a TA for Statistical Dialogue Systems, helping with grading homework assignments and teaching the lecture on natural language generation for dialogue systems.",
            cs: "Byl jsem cvičícím pro Statistické dialogové systémy, pomáhal jsem s hodnocením domácích úkolů a přednášel o generování přirozeného jazyka pro dialogové systémy.",
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
            en: "I was teaching a lab for Introduction to Linux in Czech (finally in person!). We used the inverted lecture system – instead of lectures, the students had a '<i>before-class reading</i>' which we built upon during the lab.",
            cs: "Vedl jsem cvičení k Úvodu do Linuxu (konečně prezenčně!). Používali jsme systém obrácené výuky – místo přednášek měli studenti '<i>before-class reading</i>', na kterém jsme stavěli během cvičení.",
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
            cs: "Vedl jsem cvičení k Úvodu do algoritmizace a Programování 1 přes Zoom. Nečekal jsem, že moje první výuka bude virtuální, ale hledání způsobů, jak to zvládnout, byla zajímavá výzva!",
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
