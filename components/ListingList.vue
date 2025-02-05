<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";
import type { Listing } from "~/types/Listing";

defineProps<{
    listings: Listing[];
}>();

const page = ref(1);
const listingsStore = useListingStore();

const route = useRoute();

watch(
    () => page.value,
    (newValue, oldValue) => {
        if (route.name === "my-listings") {
            listingsStore.fetchMyListings(newValue);
        } else if (route.name?.toString().includes("profile")) {
            console.log("WE ON PROFILE");
            listingsStore.fetchUserListings(
                newValue,
                Number(route.params.id as string),
            );
        } else {
            listingsStore.fetchAllListings(newValue);
        }
    },
    { immediate: false },
);

watch(
    () => listingsStore.currentCurrencyId,
    () => {
        if (route.name === "my-listings") {
            listingsStore.fetchMyListings(page.value);
        } else if (route.name?.toString().includes("profile")) {
            listingsStore.fetchUserListings(
                page.value,
                Number(route.params.id as string),
            );
        } else {
            listingsStore.fetchAllListings(page.value);
        }
    },
    { immediate: false },
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
