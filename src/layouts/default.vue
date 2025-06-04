<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const notifications = ref(0);

function clearNotifications() {
    notifications.value = 0;
}

const { on, off } = useSocket();
const handler = (payload: any) => {
    console.log("🟢 Mensagem recebida do servidor:", payload);
    notifications.value++;
};

onMounted(() => {
    on("update-user", handler);
});

onUnmounted(() => {
    off("update-user", handler);
});
</script>

<template>
    <div class="min-h-screen bg-[#0D0D0D] text-white">
        <header
            class="w-full bg-[#6D28D9] px-6 py-4 flex justify-between items-center shadow-md"
        >
            <h1 class="text-xl font-bold">Lista de Usuários</h1>

            <UButton
                color="neutral"
                class="relative"
                @click="clearNotifications"
            >
                Notificações
                <UBadge
                    color="success"
                    class="absolute -top-1 -right-2"
                    size="xs"
                >
                    {{ notifications }}
                </UBadge>
            </UButton>
        </header>

        <main class="p-6">
            <NuxtPage />
        </main>
    </div>
</template>
