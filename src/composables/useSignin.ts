/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FormSubmitEvent, TabsItem } from "@nuxt/ui";
import type { SigninSchema } from "~/utils/schemas/signin.schema";

interface UseSignin {
  loadingSignin: Ref<boolean>;
  user: Ref<UserType | null>;
  signin: (form: FormSubmitEvent<SigninSchema>) => Promise<void>;
  logout: () => Promise<void>;
  formSignin: Ref<Partial<SigninSchema>>;
  itemsTabs: TabsItem[];
}

export const useSignin = (): UseSignin => {
  const { $api } = useNuxtApp();
  const { alertError, alertSucess } = useAlert();
  const router = useRouter();

  const loadingSignin = ref<boolean>(false);

  const user = useCookie<UserType>("user");

  const formSignin = ref<Partial<SigninSchema>>({
    email: undefined,
    password: undefined,
  });

  const itemsTabs: TabsItem[] = [
    {
      label: "Entrar",
      icon: "i-lucide-lock",
      slot: "signin" as const,
    },
    {
      label: "Registrar-se",
      icon: "i-lucide-user",
      slot: "signup" as const,
    },
  ];

  const signin = async (form: FormSubmitEvent<SigninSchema>): Promise<void> => {
    try {
      loadingSignin.value = true;

      const userType = await $api.post<UserType>("/users/login", form.data);

      user.value = userType;

      router.push({ path: "/" });

      alertSucess("Usuário autorizado, bem-vindo.");
    } catch (error) {
      alertError("Não foi possível autorizar, verifique e-mail ou senha.");
    } finally {
      loadingSignin.value = false;
    }
  };

  const logout = async (): Promise<void> => {};

  return {
    loadingSignin,
    user,
    signin,
    logout,
    formSignin,
    itemsTabs,
  };
};
