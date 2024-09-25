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

		const totalListings = ref<number>(10);

		const currentListing = ref<Listing | null>(null);

		const currentPage = ref<number>(1);

		const currentCurrencyId = ref<number | null>(null);

		async function fetchAllListings(page: number = 1) {
			currentPage.value = page;
			const currencyParam = currentCurrencyId.value
				? `&currency_id=${currentCurrencyId.value}`
				: "";
			const response = await useApiFetch<{
				data: Listing[];
				meta: { total: number };
			}>(`/api/listings/?page=${page}${currencyParam}`);
			listings.value = response.data.value?.data || [];
			totalListings.value = response.data.value?.meta.total || 10;
			return response;
		}

		async function fetchMyListings(page: number = 1) {
			currentPage.value = page;
			const response = await useApiFetch<{
				data: Listing[];
				meta: { total: number };
			}>(`/api/my/listings/?page=${page}`);
			listings.value = response.data.value?.data || [];
			totalListings.value = response.data.value?.meta.total || 10;
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
			totalListings,
			currentPage,
			currentCurrencyId,
		};
	},

	{ persist: false },
);
