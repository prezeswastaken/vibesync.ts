<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";

definePageMeta({
    middleware: "auth",
});

const route = useRoute();
const id = route.params.id;

const listingStore = useListingStore();
if (Number.isNaN(Number(id))) {
    throw new Error("Invalid ID");
}
listingStore.currentListing = null;
listingStore.fetchListingByID(Number(id));
</script>

<template>
    <div class="ml-3 text-lg font-bold uppercase">{{ $t("edit") }}</div>
    <EditListingPanel
        v-if="listingStore.currentListing"
        :listing="listingStore.currentListing"
    />
</template>

<style scoped></style>
