<script setup lang="ts">
import type { Listing } from "~/types/Listing";

defineProps<{
    listing: Listing;
}>();
</script>

<template>
    <UCard class="mt-5">
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
        <div class="text-lg font-bold">{{ listing.title }}</div>
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
            <p>Links:</p>
            <NuxtLink
                v-for="link in listing.links"
                :key="link.id"
                :to="link.url"
                target="_blank"
                class="text-blue-500"
            >
                {{ link.title }}
            </NuxtLink>
        </div>
    </UCard>
</template>

<style scoped></style>
