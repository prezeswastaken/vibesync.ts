import { useUserStore } from "~/store/userStore";

export default defineNuxtRouteMiddleware((to) => {
	const userStore = useUserStore();

	if (to.path === "/login" && userStore.isLoggedIn) {
		return navigateTo("/");
	}

	if (!userStore.isLoggedIn) {
		if (to.path !== "/login") {
			return navigateTo("/login");
		}
		return;
	}

	if (userStore.user?.email == null) {
		if (to.path !== "/update-email") {
			return navigateTo("/update-email");
		}
		return;
	}
});
