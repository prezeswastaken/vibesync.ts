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

		const currentListing = ref<Listing | null>(null);

		async function fetchAllListings() {
			const response = await useApiFetch<Listing[]>("/api/listings");
			listings.value = response.data.value || [];
			return response;
		}

		async function fetchMyListings() {
			const response = await useApiFetch<Listing[]>("/api/my/listings");
			listings.value = response.data.value || [];
			return response;
		}

		async function fetchListingByID(id: number) {
			const response = await useApiFetch<Listing>(`/api/listings/${id}`);
			currentListing.value = response.data.value || null;
			return response;
		}

		async function deleteListing(id: number) {
			const response = await useApiFetch<void>(`/api/listings/${id}`, {
				method: "DELETE",
			});
			return response;
		}

		return {
			fetchAllListings,
			fetchMyListings,
			fetchListingByID,
			listings,
			currentListing,
			deleteListing,
		};
	},

	{ persist: false },
);
