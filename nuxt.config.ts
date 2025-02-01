export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@nuxt/ui",
		"@pinia/nuxt",
		"@pinia-plugin-persistedstate/nuxt",
		"@nuxtjs/i18n",
		"@formkit/auto-animate/nuxt",
	],
	ssr: false,
	compatibilityDate: "2024-09-04",
	runtimeConfig: {
		public: {
			laravelApiUrl: "http://localhost:8000", // can be overridden by NUXT_PUBLIC_LARAVEL_API_URL environment variable
			frontendUrl: "http://localhost:3000",
			reverbKey: "change-me",
			reverbHost: "0.0.0.0",
			reberbWsPort: 8080,
			reberbWssPort: 8001,
		},
	},
	spaLoadingTemplate: true,
});
