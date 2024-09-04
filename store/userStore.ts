import {
	type LoginResponse,
	type LoginFormType,
	type UserType,
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
		}

		const isLoggedIn = computed(() => accessToken.value !== null);

		function setAccessToken(token: string | null) {
			accessToken.value = token;
		}

		function setUser(newUser: UserType | null) {
			user.value = newUser;
		}

		return { user, accessToken, login, isLoggedIn, setAccessToken, setUser };
	},

	{ persist: true },
);
