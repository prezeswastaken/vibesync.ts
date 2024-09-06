import { useUserStore } from "~/store/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
	const userStore = useUserStore();
	if (userStore.isLoggedIn) {
		return navigateTo("/dashboard");
	}
});
