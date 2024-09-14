import type { Tag } from "~/types/Tag";

export const useTagStore = defineStore(
	"tag",

	() => {
		const tags = ref<Tag[]>([]);
		async function fetchTags() {
			const response = await useApiFetch<Tag[]>("/api/tags");
			tags.value = response.data.value || [];
		}

		return { tags, fetchTags };
	},

	{ persist: true },
);
