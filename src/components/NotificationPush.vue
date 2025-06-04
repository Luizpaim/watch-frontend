<script setup lang="ts">
const notifications = ref(0)

function clearNotifications() {
    notifications.value = 0
}

const { on, off } = useSocket()
const handler = (payload: Record<string, any>) => {
    notifications.value++
}

onMounted(() => {
    on("update-user", handler)
})

onUnmounted(() => {
    off("update-user", handler)
})
</script>
<template>
    <UButton color="neutral" class="cursor-pointer" @click="clearNotifications">
        Notificações
        <UBadge color="success" size="xs">
            {{ notifications }}
        </UBadge>
    </UButton>
</template>
