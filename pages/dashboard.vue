<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";
import { useUserStore } from "~/store/userStore";

definePageMeta({
    middleware: "auth",
});

const listingStore = useListingStore();

await listingStore.fetchAllListings();

console.log(listingStore.listings);

const userStore = useUserStore();
const userName = ref(userStore.user?.name);
</script>

<template>
    <div>
        <div>Hello {{ userName }}</div>
        <ListingList :listings="listingStore.listings" />
    </div>
</template>

<style scoped></style>
