/* eslint-disable @typescript-eslint/no-unused-vars */
interface UseEditUser {
    openEdit: Ref<boolean>
    openDelete: Ref<boolean>
    user: Ref<UserType | null>
    userName: Ref<string>
    openModalEdit: (id: string) => Promise<void>
    openModalDelete: (id: string) => Promise<void>
    saveUser: () => Promise<void>
    deleteUser: () => Promise<void>
    getUserById: () => Promise<void>
    userId: Ref<string | null>
    loadingUser: Ref<boolean>
    closeModalEdit: () => void
    closeModalDelete: () => void
}

export const useEditUser = (): UseEditUser => {
    const { $api } = useNuxtApp()
    const { alertError, alertSucess } = useAlert()
    const tableUserStore = useTableUsersStore()

    const loadingUser = ref<boolean>(false)

    const openDelete = ref<boolean>(false)

    const openEdit = ref<boolean>(false)

    const user = ref<UserType | null>(null)

    const userName = ref<string>("")

    const userId = ref<string | null>(null)

    const openModalEdit = async (id: string): Promise<void> => {
        userId.value = id
        openEdit.value = true
        await getUserById()
    }

    const closeModalEdit = async () => {
        userName.value = ""
        user.value = null
        openEdit.value = false
        await tableUserStore.getUsers()
    }

    const getUserById = async (): Promise<void> => {
        try {
            loadingUser.value = true
            const { data } = await $api.get<SuccessRes<UserType>>(`/users/${userId.value}`)
            user.value = data
        } catch (error) {
            user.value = null
            openEdit.value = false
            alertError("Não foi possível encontrar usuário.")
        } finally {
            loadingUser.value = false
        }
    }

    const saveUser = async (): Promise<void> => {
        try {
            loadingUser.value = true

            const userType = await $api.put<UserType>(`/users/${userId.value}`, {
                name: userName.value,
            })

            user.value = userType

            await closeModalEdit()
            alertSucess("Usuário atualizado com sucesso.")
        } catch (error) {
            alertError("Não foi possível atualizar usuário.")
        } finally {
            loadingUser.value = false
        }
    }

    const openModalDelete = async (id: string): Promise<void> => {
        userId.value = id
        await getUserById()

        if (user.value?.name) {
            userName.value = user.value.name
        }

        openDelete.value = true
    }

    const closeModalDelete = async () => {
        user.value = null
        openDelete.value = false
        await tableUserStore.getUsers()
    }

    const deleteUser = async (): Promise<void> => {
        try {
            loadingUser.value = true

            await $api.delete<UserType>(`/users/${userId.value}`, {})

            await closeModalDelete()
            alertSucess("Usuário excluido com sucesso.")
        } catch (error) {
            alertError("Não foi possível excluir usuário.")
        } finally {
            loadingUser.value = false
        }
    }

    return {
        openEdit,
        user,
        userName,
        openModalEdit,
        saveUser,
        getUserById,
        userId,
        loadingUser,
        closeModalEdit,
        deleteUser,
        openModalDelete,
        closeModalDelete,
        openDelete,
    }
}
