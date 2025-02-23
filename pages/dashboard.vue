<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";
import { useUserStore } from "~/store/userStore";

definePageMeta({
    middleware: "auth",
});

const userStore = useUserStore();

if (userStore.accessToken == null) {
    userStore.hasRefreshed = false;
}
if (!userStore.hasRefreshed) {
    window.location.reload();
    userStore.hasRefreshed = true;
}

const listingStore = useListingStore();

listingStore.fetchAllListings();

console.log(listingStore.listings);

console.log(userStore.accessToken);
</script>

<template>
    <div>
        <h1 class="mb-5 ml-3 text-lg font-bold capitalize">
            {{ $t("home") }}
        </h1>
        <CurrencySwitcher />
        <SorterPanel @update="() => listingStore.fetchAllListings()" />
        <ListingList :listings="listingStore.listings" />
    </div>
</template>

<style scoped></style>
