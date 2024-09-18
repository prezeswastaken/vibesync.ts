import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useUserStore } from "~/store/userStore";

declare global {
	interface Window {
		Echo: Echo;
		Pusher: Pusher;
	}
}

export default defineNuxtPlugin(async () => {
	window.Pusher = Pusher;
	const config = useRuntimeConfig();
	const userStore = useUserStore();
	console.log("reverb host:", config.public.reverbHost);

	const echo = new Echo({
		authEndpoint: `${config.public.laravelApiUrl}/broadcasting/auth`,

		broadcaster: "reverb",
		auth: {
			headers: {
				Authorization: `Bearer ${userStore.accessToken}`, // If using token-based auth
				Accept: "application/json",
				"X-Socket-ID": userStore.socketId,
			},
		},
		key: config.public.reverbKey,
		wsHost: config.public.reverbHost,
		wsPort: config.public.reberbWsPort,
		wssPort: config.public.reberbWssPort,
		forceTLS: false,
		enabledTransports: ["ws", "wss"],
	});

	window.Echo = echo;

	return {
		provide: {
			echo,
		},
	};
});
