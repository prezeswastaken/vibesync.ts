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
console.log(userStore.accessToken);
const userName = ref(userStore.user?.name);
</script>

<template>
    <div>
        <div class="mb-5">
            Hello {{ userName }} with email {{ userStore.user?.email }}
        </div>
        <ListingList :listings="listingStore.listings" />
    </div>
</template>

<style scoped></style>
