<script setup lang="ts">
type Props = {
    label?: string
    placeholder?: string
    classStyle?: string
    name: string
}

defineProps<Props>()

const input = defineModel<string>()

const show = ref(false)
</script>
<template>
    <UFormField :label :name :class="classStyle">
        <UInput
            v-model="input"
            :placeholder
            class="w-full"
            :type="show ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
            size="xl"
        >
            <template #trailing>
                <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show ? 'Hide password' : 'Show password'"
                    :aria-pressed="show"
                    aria-controls="password"
                    @click="show = !show"
                />
            </template>
        </UInput>
    </UFormField>
</template>
