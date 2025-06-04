<script setup lang="ts">
import { UModal, UInput, UButton } from "#components";

const editUserStore = useEditUserStore();
</script>

<template>
    <div>
        <UModal
            v-model:open="editUserStore.openDelete"
            title="Confirmação!"
            description="Tem certeza que deseja excluir esse usuário ?"
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
                    disabled
                />
            </template>

            <template #footer>
                <UButton
                    label="Cancelar"
                    class="bg-[#292929] hover:bg-[#444] text-white rounded-lg px-4 py-2"
                    variant="solid"
                    @click="editUserStore.closeModalDelete"
                />
                <UButton
                    label="Excluir"
                    class="bg-[#FF7F11] hover:bg-[#e56e00] text-white rounded-lg px-4 py-2"
                    variant="solid"
                    :loading="editUserStore.loadingUser"
                    @click="editUserStore.deleteUser"
                />
            </template>
        </UModal>
    </div>
</template>
