<script setup lang="ts">
definePageMeta({
    layout: "login",
});

const signinStore = useSigninStore();
</script>

<template>
    <SigninTabsForm :items="signinStore.itemsTabs">
        <template #signin-slot>
            <SigninForm />
        </template>

        <template #signup-slot>
            <SignupForm />
        </template>
    </SigninTabsForm>
</template>
