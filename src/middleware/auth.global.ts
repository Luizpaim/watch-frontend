export default defineNuxtRouteMiddleware((to) => {
  const user = useCookie<UserType>("user");

  if (!user.value?.accessToken && to.name !== "signin") {
    return navigateTo("/signin");
  }

  if (user.value?.accessToken && to.name === "signin") {
    return navigateTo("/");
  }
});
