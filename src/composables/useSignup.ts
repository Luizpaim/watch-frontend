/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FormSubmitEvent } from "@nuxt/ui";

import type { SignupSchema } from "~/utils/schemas/signup.schema";

interface UseSignup {
  loadingSignup: Ref<boolean>;
  signup: (form: FormSubmitEvent<SignupSchema>) => Promise<void>;
  formSignup: Ref<Partial<SignupSchema>>;
  viewDialog: Ref<boolean>;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useSignup = (): UseSignup => {
  const { $api } = useNuxtApp();
  const { alertError, alertSucess } = useAlert();

  const signinStore = useSigninStore();
  const tableUserStore = useTableUsersStore();

  const loadingSignup = ref<boolean>(false);

  const viewDialog = ref<boolean>(false);

  const formSignup = ref<Partial<SignupSchema>>({
    name: undefined,
    email: undefined,
    password: undefined,
  });

  const openDialog = () => {
    viewDialog.value = true;
  };

  const closeDialog = async () => {
    viewDialog.value = false;
    formSignup.value = {
      name: undefined,
      email: undefined,
      password: undefined,
    };
    await tableUserStore.getUsers();
  };

  const signup = async (form: FormSubmitEvent<SignupSchema>): Promise<void> => {
    try {
      loadingSignup.value = true;

      await $api.post("/users", form.data);

      alertSucess("Usuário Registrado com sucesso.");

      if (viewDialog.value) {
        await closeDialog();
        return;
      }

      signin(form);
    } catch (error) {
      alertError("Não foi possível registrar usuário");
    } finally {
      loadingSignup.value = false;
    }
  };

  const signin = async (form: FormSubmitEvent<SignupSchema>) => {
    const { name, ...cleanData } = form.data;
    await signinStore.signin({ ...form, data: cleanData });
  };

  return {
    loadingSignup,
    signup,
    formSignup,
    viewDialog,
    openDialog,
    closeDialog,
  };
};
