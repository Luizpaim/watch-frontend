<script setup lang="ts">
type Props = {
    label?: string
    icon?: string
    placeholder?: string
    name: string
}

defineProps<Props>()

const input = defineModel<string>()
</script>
<template>
    <UFormField :label :name>
        <UInput
            v-model="input"
            :trailing-icon="icon"
            :placeholder="placeholder"
            size="xl"
            class="w-full"
        />
    </UFormField>
</template>
