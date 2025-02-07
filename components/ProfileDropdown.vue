<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

const { t } = useI18n();

const profileImage = computed(() => {
    const userImage = userStore.user?.avatar_url;
    const profileImage =
        userImage ??
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
    console.log(profileImage);
    return profileImage;
});

const signedAsText = computed(() => {
    return userStore.user?.email ?? userStore.user?.name;
});
const userStore = useUserStore();
const items = computed(() => [
    [
        {
            label: signedAsText,
            slot: "account",
            disabled: true,
        },
    ],
    [
        {
            label: t("yourListings"),
            icon: "i-heroicons-book-open",
            click: () => navigateTo("/my-listings"),
        },
    ],
    [
        {
            label: t("accountSettings"),
            icon: "grommet-icons:configure",
            click: () => navigateTo("/account-settings"),
        },
    ],
    [
        {
            label: t("logout"),
            icon: "i-heroicons-arrow-left-on-rectangle",
            click: async () => {
                await userStore.logout();
                navigateTo("/login");
            },
        },
    ],
]);
</script>

<template>
    <div class="flex flex-col justify-center">
        <UDropdown
            :items="items"
            :ui="{ item: { disabled: 'cursor-text select-text' } }"
            :popper="{ placement: 'bottom-start' }"
        >
            <UAvatar :src="profileImage" size="md" />

            <template #account="{ item }">
                <div class="text-left">
                    <p>{{ $t("signedInAs") }}</p>
                    <p
                        class="font-medium text-gray-900 dark:text-white truncate"
                    >
                        {{ item.label }}
                    </p>
                </div>
            </template>

            <template #item="{ item }">
                <span class="truncate">{{ item.label }}</span>

                <UIcon
                    :name="item.icon"
                    class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500 ms-auto"
                />
            </template>
        </UDropdown>
    </div>
</template>

<style scoped></style>
