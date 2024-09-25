import type { Currency } from "~/types/Currency";

export const useCurrencyStore = defineStore(
	"currency",

	() => {
		const currencies = ref<Currency[]>([]);
		async function fetchCurrencies() {
			const response = await useApiFetch<Currency[]>("/api/currencies");
			currencies.value = response.data.value || [];
		}

		return { currencies, fetchCurrencies };
	},

	{ persist: false },
);
