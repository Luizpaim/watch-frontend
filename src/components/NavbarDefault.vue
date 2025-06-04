<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[][]>([
    [
        {
            label: "Guide",
            icon: "i-lucide-book-open",
            to: "/getting-started",
        },
        {
            label: "Composables",
            icon: "i-lucide-database",
            to: "/composables",
        },
        {
            label: "Components",
            icon: "i-lucide-box",
            to: "/components",
            active: true,
        },
    ],
    [
        {
            label: "GitHub",
            icon: "i-simple-icons-github",
            badge: "3.8k",
            to: "https://github.com/nuxt/ui",
            target: "_blank",
        },
    ],
]);
</script>
<template>
    <UNavigationMenu
        color="neutral"
        class="bg-cyan-50 w-full text-zinc-950"
        :items="items"
    />
</template>
