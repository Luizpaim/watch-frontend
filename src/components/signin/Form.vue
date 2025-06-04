<script setup lang="ts">
import { InputText } from "#components";
import { signinSchema } from "~/utils/schemas/signin.schema";

const signinStore = useSigninStore();
</script>

<template>
    <UForm
        class="w-full max-w-md space-y-4 text-white"
        :validate-on="['focus', 'input']"
        :schema="signinSchema"
        :state="signinStore.formSignin"
        @submit="signinStore.signin"
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
                v-model="signinStore.formSignin.email"
                name="email"
                icon="i-lucide-at-sign"
                placeholder="Digite seu e-mail"
                label="E-mail"
                class="w-full mb-4"
                :ui="{
                    label: 'text-white',
                    wrapper:
                        '  focus-within:ring-2 focus-within:ring-[#FF7F11]',
                }"
            />

            <InputPassword
                v-model="signinStore.formSignin.password"
                name="password"
                class="w-full mb-3"
                placeholder="Digite sua senha"
                label="Senha"
                :ui="{
                    label: 'text-white',
                    wrapper: 'focus-within:ring-2 focus-within:ring-[#FF7F11]',
                }"
            />

            <template #footer>
                <UButton
                    :loading="signinStore.loadingSignin"
                    size="xl"
                    type="submit"
                    block
                    color="neutral"
                    class="cursor-pointer bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
                >
                    Entrar
                </UButton>
            </template>
        </UCard>
    </UForm>
</template>
