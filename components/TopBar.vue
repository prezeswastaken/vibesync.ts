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

const authLinks = computed(() => [
    {
        label: t("home"),
        icon: "i-heroicons-home",
        to: "/dashboard",
    },
]);

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
                v-if="
                    !route.path.includes('/login') &&
                    !route.path.includes('/register')
                "
                :label="$t('createListing')"
                class="m-3"
                @click="toggleShowModal"
            />
            <UHorizontalNavigation
                class="w-fit"
                :links="userStore.isLoggedIn ? authLinks : guestLinks"
            />
            <LanguageSelect />
            <ProfileDropdown v-if="userStore.isLoggedIn" class="mr-5 ml-5" />
        </div>
        <UModal v-model="showModal" title="Create Listing" prevent-close
            ><UCard>
                <template #header>
                    <div class="flex justify-between w-full">
                        <h1>{{ $t("createListing") }}</h1>
                        <UButton
                            color="white"
                            icon="ci:close-md"
                            no-rel
                            @click="() => (showModal = false)"
                            :title="$t('close')"
                        />
                    </div>
                </template>
                <CreateListingForm @close="() => (showModal = false)" />
                <template #footer> </template>
            </UCard>
        </UModal>
        <AuthNotifications v-if="userStore.accessToken != null" />
    </div>
</template>
