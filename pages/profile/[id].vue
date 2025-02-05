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

const route = useRoute();
const userID = Number(route.params.id as string);

type OtherUser = {
    id: string;
    name: string;
    email: string;
};

const listingStore = useListingStore();
const user = ref<OtherUser | null>(null);
fetchUser();

listingStore.fetchUserListings(1, userID);

console.log(listingStore.listings);

console.log(userStore.accessToken);

async function fetchUser() {
    const { data } = await useApiFetch<OtherUser>(`/api/users/${userID}`);
    user.value = data.value;
    console.log("USER", user.value);
}
</script>

<template>
    <div>
        <h1 class="mb-5 ml-3 text-lg font-bold capitalize">
            {{ $t("profile") }} {{ ` ${user?.name}` }}
        </h1>
        <CurrencySwitcher />
        <ListingList :listings="listingStore.listings" />
    </div>
</template>
