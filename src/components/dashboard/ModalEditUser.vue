<script setup lang="ts">
import { UModal, UInput, UButton } from "#components";

const editUserStore = useEditUserStore();
</script>

<template>
    <div>
        <UModal
            v-model:open="editUserStore.openEdit"
            title="Editar Nome do Usuário"
            description="Altere o nome do usuário e clique em Salvar"
            :ui="{
                header: 'border-none bg-transparent',
                footer: 'justify-end border-none bg-transparent',
                body: 'bg-transparent',
            }"
            width="max-w-md"
        >
            <template #body>
                <UInput
                    v-model="editUserStore.userName"
                    placeholder="Digite o novo nome"
                    class="w-full bg-[#1E1B4B] text-white border-none rounded-lg mb-2"
                    autofocus
                    size="xl"
                />
            </template>

            <template #footer>
                <UButton
                    label="Cancelar"
                    class="bg-[#292929] hover:bg-[#444] text-white rounded-lg px-4 py-2"
                    variant="solid"
                    @click="editUserStore.closeModalEdit"
                />
                <UButton
                    label="Salvar"
                    class="bg-[#FF7F11] hover:bg-[#e56e00] text-white rounded-lg px-4 py-2"
                    variant="solid"
                    :loading="editUserStore.loadingUser"
                    @click="editUserStore.saveUser"
                />
            </template>
        </UModal>
    </div>
</template>
