declare module "#app" {
    interface NuxtApp {
        $api: ReturnType<typeof useRequestApi>
        $locally: {
            getItem(key: string): Promise<any>
            setItem(item: string, value: any): void
            removeItem(item: string): void
        }
    }
}
export {}
