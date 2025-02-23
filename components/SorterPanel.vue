<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";

const emit = defineEmits(["update"]);

const listingStore = useListingStore();

const sortByLikes = ref<string | null>(null);

const { t } = useI18n();

watchEffect(() => {
    listingStore.sortByLikes = sortByLikes.value;
    emit("update");
    console.log(listingStore.sortByLikes);
});

const unchangedOption = computed(() => {
    return { symbol: t("unchanged"), value: null };
});

const options = [
    { symbol: "⬆️", value: "asc" },
    { symbol: "⬇️", value: "desc" },
];
</script>

<template>
    <div class="mb-4">
        <USelectMenu
            v-model="sortByLikes"
            :options="[unchangedOption, ...options]"
            :placeholder="$t('sortByLikes')"
            value-attribute="value"
            option-attribute="symbol"
        />
    </div>
</template>

<style scoped></style>
