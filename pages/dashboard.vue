<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";
import { useUserStore } from "~/store/userStore";

definePageMeta({
    middleware: "auth",
});

const listingStore = useListingStore();

listingStore.fetchAllListings();

console.log(listingStore.listings);

const userStore = useUserStore();
console.log(userStore.accessToken);
const userName = ref(userStore.user?.name);
</script>

<template>
    <div>
        <h1 class="mb-5 ml-3 text-lg font-bold capitalize">
            {{ $t("home") }}
        </h1>
        <ListingList :listings="listingStore.listings" />
    </div>
</template>

<style scoped></style>
