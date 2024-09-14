import { useLocaleStore } from "~/store/localeStore";

export default defineNuxtPlugin((nuxtApp) => {
	const localeStore = useLocaleStore();
});
