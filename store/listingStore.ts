import type { Listing } from "~/types/Listing";
import {
	type LoginResponse,
	type LoginFormType,
	type UserType,
	type RegisterFormType,
} from "~/types/User";

export const useListingStore = defineStore(
	"listing",

	() => {
		const listings = ref<Listing[]>([]);

		async function fetchAllListings() {
			const response = await useApiFetch<Listing[]>("/api/listings");
			listings.value = response.data.value || [];
			return response;
		}
		return { fetchAllListings, listings };
	},

	{ persist: true },
);
