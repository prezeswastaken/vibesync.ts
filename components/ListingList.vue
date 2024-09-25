<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";
import type { Listing } from "~/types/Listing";

defineProps<{
    listings: Listing[];
}>();

const page = ref(1);
const listingsStore = useListingStore();

const route = useRoute();

watchEffect(() => {
    if (route.name === "my-listings") {
        listingsStore.fetchMyListings(page.value);
    } else {
        listingsStore.fetchAllListings(page.value);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
});

watch(
    () => listingsStore.currentCurrencyId,
    () => {
        if (route.name === "my-listings") {
            listingsStore.fetchMyListings(page.value);
        } else {
            listingsStore.fetchAllListings(page.value);
        }
    },
);
</script>

<template>
    <UCard>
        <ListingPanel
            v-for="listing in listings"
            :key="listing.id"
            :listing="listing"
        />
    </UCard>
    <UPagination v-model="page" :total="listingsStore.totalListings" />
</template>

<style scoped></style>
