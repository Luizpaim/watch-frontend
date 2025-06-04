/* eslint-disable @typescript-eslint/no-unused-vars */
interface UseTableUser {
  page: Ref<number>;
  pageSize: Ref<number>;
  users: Ref<Partial<UserType>[]>;
  getUsers: () => Promise<void>;
  loadingUsers: Ref<boolean>;
}

export const useTableUser = (): UseTableUser => {
  const { $api } = useNuxtApp();

  const page = ref(1);
  const pageSize = ref(10);
  const loadingUsers = ref<boolean>(false);

  const users = ref<Partial<UserType>[]>([]);

  const getUsers = async (): Promise<void> => {
    try {
      loadingUsers.value = true;

      const { data, meta } = await $api.get<Pagination<UserType>>("/users", {
        options: {
          params: {
            page: page.value,
            perPage: pageSize.value,
          },
        },
      });
      users.value = data;
      page.value = meta.lastPage;
      pageSize.value = meta.perPage;
    } catch (error) {
      users.value = [];
    } finally {
      loadingUsers.value = false;
    }
  };

  onMounted(getUsers);

  return {
    page,
    pageSize,
    users,
    getUsers,
    loadingUsers,
  };
};
