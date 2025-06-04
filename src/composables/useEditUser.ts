/* eslint-disable @typescript-eslint/no-unused-vars */
interface UseEditUser {
  open: Ref<boolean>;
  user: Ref<UserType | null>;
  userName: Ref<string>;
  openModal: (id: string) => Promise<void>;
  saveUser: () => Promise<void>;
  getUserById: () => Promise<void>;
  userId: Ref<string | null>;
  loadingUser: Ref<boolean>;
  closeModal: () => void;
}

export const useEditUser = (): UseEditUser => {
  const { $api } = useNuxtApp();
  const { alertError, alertSucess } = useAlert();
  const tableUserStore = useTableUsersStore();

  const loadingUser = ref<boolean>(false);

  const open = ref<boolean>(false);

  const user = ref<UserType | null>(null);

  const userName = ref<string>("");

  const userId = ref<string | null>(null);

  const openModal = async (id: string): Promise<void> => {
    userId.value = id;
    open.value = true;
    await getUserById();
  };

  const saveUser = async (): Promise<void> => {
    try {
      loadingUser.value = true;

      const userType = await $api.put<UserType>(`/users/${userId.value}`, {
        name: userName.value,
      });

      user.value = userType;

      await closeModal();
      alertSucess("Usuário autualizado com sucesso.");
    } catch (error) {
      alertError("Não foi possível atualizar usuário.");
    } finally {
      loadingUser.value = false;
    }
  };

  const closeModal = async () => {
    userName.value = "";
    user.value = null;
    open.value = false;
    await tableUserStore.getUsers();
  };

  const getUserById = async (): Promise<void> => {
    try {
      loadingUser.value = true;
      user.value = await $api.get<UserType>(`/users/${userId.value}`);
    } catch (error) {
      user.value = null;
      open.value = false;
      alertError("Não foi possível encontrar usuário.");
    } finally {
      loadingUser.value = false;
    }
  };

  return {
    open,
    user,
    userName,
    openModal,
    saveUser,
    getUserById,
    userId,
    loadingUser,
    closeModal,
  };
};
