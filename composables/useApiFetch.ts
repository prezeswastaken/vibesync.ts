import type { UseFetchOptions } from "nuxt/app";
import { useUserStore } from "~/store/userStore";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
	const userStore = useUserStore();

	const config = useRuntimeConfig();
	let headers: any = {
		referer: config.public.frontendUrl,
		charset: "UTF-8",
		Accept: "application/json",
	};

	if (userStore.accessToken !== null) {
		headers["Authorization"] = `Bearer ${userStore.accessToken}`;
	}

	return useFetch(`${config.public.laravelApiUrl}${path}`, {
		// credentials: "include",
		watch: false,
		...options,
		headers: {
			...headers,
			...options?.headers,
		},
	});
}
