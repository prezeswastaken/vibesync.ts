import type { UseFetchOptions } from "nuxt/app";
import { useLocaleStore } from "~/store/localeStore";
import { useUserStore } from "~/store/userStore";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
	const userStore = useUserStore();

	const config = useRuntimeConfig();
	let headers: any = {
		referer: config.public.frontendUrl,
		charset: "UTF-8",
		Accept: "application/json",
		"X-Socket-ID": userStore.socketId,
	};

	if (userStore.accessToken != null) {
		headers["Authorization"] = `Bearer ${userStore.accessToken}`;
	}

	const localeStore = useLocaleStore();
	const locale = localeStore.locale;

	let bodyWithLocale;
	if (
		options?.body &&
		typeof options.body === "object" &&
		!Array.isArray(options.body)
	) {
		bodyWithLocale = {
			locale: locale,
			...options.body,
		};
	} else if (options?.body === undefined) {
		bodyWithLocale = { locale: locale };
	} else {
		throw new Error(
			"Body is not an object, you CAN'T use JSON.stringify on it!",
		);
	}

	return useFetch(`${config.public.laravelApiUrl}${path}`, {
		// credentials: "include",
		watch: false,
		...options,
		headers: {
			...headers,
			...options?.headers,
		},
		body:
			options?.method &&
			["POST", "PUT", "PATCH"].includes(options.method.toUpperCase())
				? bodyWithLocale
				: undefined,
	});
}
