<script setup lang="ts">
import { signupSchema } from "~/utils/schemas/signup.schema";

const signupStore = useSignupStore();
</script>

<template>
    <UForm
        class="w-full max-w-md space-y-4 text-white"
        :validate-on="['focus', 'input']"
        :schema="signupSchema"
        :state="signupStore.formSignup"
        @submit="signupStore.signup"
    >
        <UCard
            class="shadow-none"
            variant="solid"
            :ui="{
                body: 'bg-[#1E1B4B] text-white',
                header: 'bg-[#1E1B4B] border-[#fff] text-white',
                footer: 'bg-[#1E1B4B]',
            }"
        >
            <InputText
                v-model="signupStore.formSignup.name"
                name="name"
                placeholder="Digite seu nome"
                label="Nome"
                class="w-full mb-4"
                :ui="{
                    label: 'text-white',
                    wrapper: ' focus-within:ring-2 focus-within:ring-[#FF7F11]',
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
                    wrapper: ' focus-within:ring-2 focus-within:ring-[#FF7F11]',
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
                    wrapper: ' focus-within:ring-2 focus-within:ring-[#FF7F11]',
                }"
            />

            <template #footer>
                <UButton
                    :loading="signupStore.loadingSignup"
                    type="submit"
                    block
                    size="xl"
                    color="neutral"
                    class="cursor-pointer bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
                >
                    Registrar
                </UButton>
            </template>
        </UCard>
    </UForm>
</template>
