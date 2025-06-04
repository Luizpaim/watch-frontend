import { io, type Socket } from "socket.io-client";
import { ref, computed, watch } from "vue";

let socket: Socket | null = null;
const currentSocket = ref<Socket | null>(null);

export const useSocket = () => {
  const user = useCookie<UserType>("user");
  const token = computed(() => user?.value?.accessToken);
  const config = useRuntimeConfig();
  const baseURL = config.public.apiGateway as string;

  watch(
    token,
    (newToken) => {
      if (socket) {
        socket.disconnect();
        socket = null;
        currentSocket.value = null;
      }
      if (newToken) {
        socket = io(baseURL, {
          transports: ["websocket"],
          withCredentials: true,
          auth: { token: newToken },
        });
        currentSocket.value = socket;
        socket.on("connect", () => true);
        socket.on("disconnect", () => false);
      }
    },
    { immediate: true },
  );

  const on = (event: string, callback: (...args: any[]) => void) => {
    currentSocket.value?.on(event, callback);
  };

  const off = (event: string, callback: (...args: any[]) => void) => {
    currentSocket.value?.off(event, callback);
  };

  return { socket: currentSocket, on, off };
};
