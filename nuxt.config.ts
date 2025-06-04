export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: false },
    css: ["@/assets/css/main.css"],
    runtimeConfig: {
        public: {
            apiGateway: process.env.NUXT_PUBLIC_API_GATEWAY,
        },
    },

    ssr: true,
    srcDir: "src/",
    imports: {
        dirs: ["utils", "utils/schema"],
    },
    app: {
        pageTransition: { name: "page", mode: "out-in" },
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
    },

    plugins: ["@/plugins/locally.client.ts", "@/plugins/request-api.client.ts"],
    modules: [
        "@nuxt/content",
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxt/scripts",
        "@nuxt/test-utils",
        "@nuxt/ui",
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "pinia-plugin-persistedstate",
    ],
})
