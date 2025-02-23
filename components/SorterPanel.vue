<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";

const emit = defineEmits(["update"]);

const listingStore = useListingStore();

const sortByLikes = ref<string | null>(null);

const { t } = useI18n();

const unchangedOption = computed(() => {
    return { id: 0, code: t("unchanged") };
});

watchEffect(() => {
    listingStore.sortByLikes = sortByLikes.value;
    emit("update");
    console.log(listingStore.sortByLikes);
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
            :options="options"
            :placeholder="$t('sortByLikes')"
            value-attribute="value"
            option-attribute="symbol"
        />
    </div>
</template>

<style scoped></style>
