/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, type Socket } from "socket.io-client";

let socket: Socket;

export const useSocket = () => {
  const user = useCookie<UserType>("user");

  const token = ref<string>();

  if (user?.value?.accessToken) {
    token.value = user.value.accessToken;
  }

  const config = useRuntimeConfig();

  const baseURL = config.public.apiGateway as string;

  if (!socket) {
    socket = io(baseURL, {
      transports: ["websocket"],
      withCredentials: true,
      auth: {
        token: token.value,
      },
    });

    socket.on("connect", () => {
      console.log("✅ Socket conectado:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Socket desconectado");
    });
  }

  const on = (event: string, callback: (...args: any[]) => void) => {
    socket.on(event, callback);
  };

  const off = (event: string) => {
    socket.off(event);
  };

  return {
    socket,
    on,
    off,
  };
};
