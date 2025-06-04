export default defineNuxtPlugin((nuxtApp) => {
    const api = useRequestApi()
    nuxtApp.provide("api", api)
})
