/* eslint-disable @typescript-eslint/no-unused-vars */
interface UseTableUser {
    users: Ref<Partial<UserType>[]>
    getUsers: () => Promise<void>
    loadingUsers: Ref<boolean>
}

export const useTableUser = (): UseTableUser => {
    const { $api } = useNuxtApp()

    const loadingUsers = ref<boolean>(false)

    const users = ref<Partial<UserType>[]>([])

    const getUsers = async (): Promise<void> => {
        try {
            loadingUsers.value = true

            const { data } = await $api.get<Pagination<UserType>>("/users")
            users.value = data
        } catch (error) {
            users.value = []
        } finally {
            loadingUsers.value = false
        }
    }

    onMounted(getUsers)

    return {
        users,
        getUsers,
        loadingUsers,
    }
}
