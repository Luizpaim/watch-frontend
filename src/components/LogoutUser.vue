<script setup lang="ts">
const signinStore = useSigninStore()
</script>
<template>
    <UButton color="neutral" class="cursor-pointer" @click="signinStore.logout"> Sair </UButton>
</template>
