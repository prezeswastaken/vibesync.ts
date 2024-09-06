<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

const route = useRoute();

const userStore = useUserStore();

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
    <div class="flex justify-around">
        <div class="w-full"></div>
        <UHorizontalNavigation
            :links="userStore.isLoggedIn ? authLinks : guestLinks"
            class="flex justify-end border-b border-gray-200 dark:border-gray-800 w-fit"
        />
    </div>
</template>
