<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
import type { Listing } from "~/types/Listing";

defineProps<{
    listing: Listing;
}>();

const userStore = useUserStore();
</script>

<template>
    <UCard class="mt-5">
        <p v-if="!listing.is_published" class="text-orange-300 lowercase">
            ( {{ $t("unpublished") }} )
        </p>
        <div class="flex justify-between w-full">
            <div class="flex gap-4">
                <div class="text-md">{{ listing.author }}</div>
                <img
                    :src="
                        listing.author_avatar_url ??
                        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
                    "
                    class="w-8 h-8 rounded-full"
                />
            </div>
            <UButton
                v-if="listing.user_id === userStore.user?.id"
                @click="() => navigateTo(`/edit/listings/${listing.id}`)"
                color="white"
                icon="mdi-light:pencil"
                >{{ $t("edit") }}</UButton
            >
        </div>
        <div
            class="text-lg font-bold"
            :class="listing.is_published ? '' : ' text-gray-500'"
        >
            {{ listing.title }}
        </div>
        <div>{{ listing.body }}</div>
        <div class="flex justify-between mt-3 w-full">
            <p
                class="p-1 text-sm text-gray-500 w-fit"
                v-for="tag in listing.tags"
            >
                {{ tag }}
            </p>
        </div>
        <div class="flex justify-between mt-3 w-full">
            <p
                class="p-1 text-sm text-gray-500 w-fit"
                v-for="genre in listing.genres"
            >
                {{ genre }}
            </p>
        </div>

        <div class="flex flex-col">
            <p v-if="listing.links.length > 0">Links:</p>
            <NuxtLink
                v-for="link in listing.links"
                :key="link.id"
                :to="link.url"
                target="_blank"
                class="text-blue-500 w-fit"
            >
                <UIcon name="mdi-light:link-variant" class="mr-2" />
                {{ link.url }}
            </NuxtLink>
        </div>
    </UCard>
</template>

<style scoped></style>
