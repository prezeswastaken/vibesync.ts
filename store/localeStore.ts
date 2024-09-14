import {} from "~/types/User";

export const useLocaleStore = defineStore(
	"locale",

	() => {
		const locale = ref<string>("en");
		function setLocaleInStore(newLocale: string) {
			locale.value = newLocale;
		}

		return { locale, setLocaleInStore };
	},

	{ persist: true },
);
