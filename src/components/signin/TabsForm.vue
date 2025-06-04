<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

defineProps<{
    items: TabsItem[];
}>();
</script>

<template>
    <div
        class="flex items-center justify-center h-full bg-[#0D0D0D] text-white"
    >
        <div
            class="w-full max-w-md flex flex-col gap-6 min-h-[500px] bg-[#1E1B4B] p-6 rounded-xl shadow-lg"
        >
            <UTabs
                :items="items"
                variant="link"
                color="neutral"
                :ui="{
                    list: 'flex border-b border-gray-700',
                    trigger: 'grow',
                }"
            >
                <template #signin>
                    <div class="w-full mt-4">
                        <slot name="signin-slot" />
                    </div>
                </template>
                <template #signup>
                    <div class="w-full mt-4">
                        <slot name="signup-slot" />
                    </div>
                </template>
            </UTabs>
        </div>
    </div>
</template>
