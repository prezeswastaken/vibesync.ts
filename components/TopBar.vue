<script setup lang="ts">
import { useLocaleStore } from "~/store/localeStore";
import { useUserStore } from "~/store/userStore";

const route = useRoute();

const userStore = useUserStore();

const showModal = ref(false);

function toggleShowModal() {
    if (!userStore.isLoggedIn) {
        navigateTo("/login");
        return;
    }
    showModal.value = !showModal.value;
}

const { t } = useI18n();

const profileImage = computed(() => {
    const userImage = userStore.user?.avatar_url;
    const profileImage =
        userImage ??
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
    console.log(profileImage);
    return profileImage;
});

const authLinks = computed(() => [
    {
        label: t("home"),
        icon: "i-heroicons-home",
        to: "/dashboard",
    },
    {
        label: t("profile"),
        avatar: {
            src: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        },
        // badge: 100,
        to: "/profile",
    },
    {
        label: t("logout"),
        icon: "i-heroicons-arrow-left-end-on-rectangle",
        click: async () => {
            await userStore.logout();
            navigateTo("/login");
        },
    },
]);

watchEffect(() => {
    authLinks.value[1].avatar.src = profileImage.value;
});

const guestLinks = computed(() => [
    {
        label: t("login"),
        icon: "i-heroicons-arrow-right-end-on-rectangle",
        to: "/login",
    },
    {
        label: t("register"),
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
            class="flex justify-end pl-12 border-b border-gray-200 dark:border-gray-800 w-fit"
        >
            <UButton
                :label="$t('createListing')"
                class="m-3"
                @click="toggleShowModal"
            />
            <UHorizontalNavigation
                class="w-fit"
                :links="userStore.isLoggedIn ? authLinks : guestLinks"
            />
            <LanguageSelect class="mr-5" />
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
