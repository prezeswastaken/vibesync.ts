<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

const route = useRoute();

const userStore = useUserStore();

const showModal = ref(false);

function toggleShowModal() {
    showModal.value = !showModal.value;
}

const authLinks = ref([
    {
        label: "Home",
        icon: "i-heroicons-home",
        to: "/dashboard",
    },
    {
        label: "Profile",
        avatar: {
            src: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        },
        // badge: 100,
        to: "/profile",
    },
    {
        label: "Logout",
        icon: "i-heroicons-arrow-left-end-on-rectangle",
        click: async () => {
            await userStore.logout();
            navigateTo("/login");
        },
    },
]);

const guestLinks = ref([
    {
        label: "Login",
        icon: "i-heroicons-arrow-right-end-on-rectangle",
        to: "/login",
    },
    {
        label: "Register",
        icon: "i-heroicons-academic-cap",
        to: "/register",
    },
]);
</script>

<template>
    <div
        class="flex fixed top-0 left-0 justify-around w-full bg-neutral-50 dark:bg-neutral-900"
    >
        <div class="w-full"></div>
        <div
            class="flex justify-end border-b border-gray-200 dark:border-gray-800"
        >
            <UButton
                label="CREATE LISTING"
                class="m-3"
                @click="toggleShowModal"
            />
            <UHorizontalNavigation
                :links="userStore.isLoggedIn ? authLinks : guestLinks"
            />
        </div>
        <UModal v-model="showModal" title="Create Listing" prevent-close
            ><UCard>
                <template #header> <h1>Create listing</h1> </template>
                <CreateListingForm @close="() => (showModal = false)" />
                <template #footer> </template>
            </UCard>
        </UModal>
    </div>
</template>
