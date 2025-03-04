import { useUserStore } from "~/store/userStore";
import { type RefreshResponse } from "~/types/User";

export default defineNuxtPlugin(async (nuxtApp) => {
	const userStore = useUserStore();

	const route = useRoute();
	const token = (route.query.token as string) || undefined;
	if (token != null) {
		userStore.hasRefreshed = true;
		userStore.setAccessToken(token);
		await userStore.fetchUser();
		navigateTo("/dashboard");
	}

	const oldAccessToken = userStore.accessToken;

	if (oldAccessToken !== null) {
		try {
			const response = await useApiFetch<RefreshResponse>("/api/refresh", {
				method: "POST",
			});

			userStore.setAccessToken(response.data.value?.access_token || null);
			userStore.setUser(response.data.value?.user || null);
			console.log(
				"User in store:",
				userStore.user?.name,
				"with email:",
				userStore.user?.email,
				"is admin:",
				userStore.user?.is_admin,
			);
		} catch (e) {
			userStore.setAccessToken(null);
			userStore.setUser(null);
		}
	}
});
