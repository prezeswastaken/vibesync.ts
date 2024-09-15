<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";
definePageMeta({
    middleware: "auth",
});

const listingStore = useListingStore();
listingStore.fetchMyListings();
</script>

<template>
    <div>
        <h1 class="mb-5 ml-3 text-lg font-bold capitalize">
            {{ $t("yourListings") }}
        </h1>
        <ListingList :listings="listingStore.listings" />
    </div>
</template>

<style scoped></style>
