import type { Genre } from "~/types/Genre";

export const useGenreStore = defineStore(
	"genre",

	() => {
		const genres = ref<Genre[]>([]);
		async function fetchGenres() {
			const response = await useApiFetch<Genre[]>("/api/genres");
			genres.value = response.data.value || [];
		}

		return { genres, fetchGenres };
	},

	{ persist: false },
);
