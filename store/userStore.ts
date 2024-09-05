import {
	type LoginResponse,
	type LoginFormType,
	type UserType,
	type RegisterFormType,
} from "~/types/User";

export const useUserStore = defineStore(
	"user",

	() => {
		const user = ref<UserType | null>(null);
		const accessToken = ref<string | null>(null);
		async function login(form: LoginFormType) {
			const response = await useApiFetch<LoginResponse>("/api/login", {
				body: JSON.stringify(form),
				method: "POST",
			});
			user.value = response.data.value?.user || null;
			accessToken.value = response.data.value?.access_token || null;
			return response;
		}

		async function register(form: RegisterFormType) {
			const response = await useApiFetch<LoginResponse>("/api/register", {
				body: JSON.stringify(form),
				method: "POST",
			});
			user.value = response.data.value?.user || null;
			accessToken.value = response.data.value?.access_token || null;
			return response;
		}

		async function logout() {
			const response = await useApiFetch("/api/logout", {
				method: "POST",
			});
			user.value = null;
			accessToken.value = null;
			return response;
		}

		const isLoggedIn = computed(() => accessToken.value !== null);

		function setAccessToken(token: string | null) {
			accessToken.value = token;
		}

		function setUser(newUser: UserType | null) {
			user.value = newUser;
		}

		return {
			user,
			accessToken,
			login,
			register,
			isLoggedIn,
			setAccessToken,
			setUser,
		};
	},

	{ persist: true },
);
