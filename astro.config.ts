import { rename, rmdir } from "node:fs/promises";
import type { AstroIntegration } from "astro";
import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { SITE } from "./src/config";

// Cloudflare Pages answers a missing page with the nearest 404.html up the path, so
// /cs/... needs a cs/404.html; Astro writes every 404 except the root one as 404/index.html.
const czechNotFound: AstroIntegration = {
  name: "czech-404",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      await rename(new URL("cs/404/index.html", dir), new URL("cs/404.html", dir));
      await rmdir(new URL("cs/404/", dir));
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "cs"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: page => !/\/404\/?$/.test(page),
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          cs: "cs",
        },
      },
    }),
    icon({
      include: {
        tabler: ["*"], // Include all Tabler icons
      },
    }),
    czechNotFound,
  ],
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Fira Sans",
        cssVariable: "--font-fira-sans",
        provider: fontProviders.google(),
        fallbacks: ["sans-serif"],
        weights: [300, 400, 500, 600, 700],
        styles: ["normal", "italic"],
        subsets: ["latin", "latin-ext"],
      },
      {
        name: "Signika Negative",
        cssVariable: "--font-signika-negative",
        provider: fontProviders.google(),
        fallbacks: ["sans-serif"],
        weights: [400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["latin", "latin-ext"],
      },
    ],
  },
});
