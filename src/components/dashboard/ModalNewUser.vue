<script setup lang="ts">
import { UModal, UButton } from "#components";
import { signupSchema } from "~/utils/schemas/signup.schema";

const signupStore = useSignupStore();
</script>

<template>
    <div>
        <UModal
            v-model:open="signupStore.viewDialog"
            title="Editar Nome do Usuário"
            description="Altere o nome do usuário e clique em Salvar"
            :ui="{
                base: 'bg-[#0D0D0D] text-white rounded-xl',
                header: 'border-none bg-transparent',
                footer: 'justify-end border-none bg-transparent',
                body: 'bg-transparent',
            }"
            width="max-w-md"
        >
            <template #body>
                <UForm
                    class="w-full max-w-md space-y-4 text-white"
                    :validate-on="['focus', 'input']"
                    :schema="signupSchema"
                    :state="signupStore.formSignup"
                    @submit="signupStore.signup"
                >
                    <InputText
                        v-model="signupStore.formSignup.name"
                        name="name"
                        placeholder="Digite seu nome"
                        label="Nome"
                        class="w-full mb-4"
                        :ui="{
                            label: 'text-white',
                            wrapper:
                                ' focus-within:ring-2 focus-within:ring-[#FF7F11]',
                        }"
                    />

                    <InputText
                        v-model="signupStore.formSignup.email"
                        name="email"
                        icon="i-lucide-at-sign"
                        placeholder="Digite seu e-mail"
                        label="E-mail"
                        class="w-full mb-4"
                        :ui="{
                            label: 'text-white',
                            wrapper:
                                ' focus-within:ring-2 focus-within:ring-[#FF7F11]',
                        }"
                    />

                    <InputPassword
                        v-model="signupStore.formSignup.password"
                        name="password"
                        placeholder="Digite sua senha"
                        label="Senha"
                        class="w-full mb-3"
                        :ui="{
                            label: 'text-white',
                            wrapper:
                                ' focus-within:ring-2 focus-within:ring-[#FF7F11]',
                        }"
                    />
                    <div class="w-full flex align-center justify-end gap-3">
                        <UButton
                            label="Cancelar"
                            class="bg-[#292929] hover:bg-[#444] text-white rounded-lg px-4 py-2"
                            variant="solid"
                            size="xl"
                            @click="signupStore.closeDialog"
                        />
                        <UButton
                            type="submit"
                            label="Salvar"
                            size="xl"
                            class="cursor-pointer bg-[#FF7F11] hover:bg-[#e56e00] text-white rounded-lg px-4 py-2"
                            variant="solid"
                            :loading="signupStore.loadingSignup"
                        />
                    </div>
                </UForm>
            </template>
        </UModal>
    </div>
</template>
