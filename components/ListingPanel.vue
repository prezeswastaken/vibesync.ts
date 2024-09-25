<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";
import { useUserStore } from "~/store/userStore";
import type { Listing } from "~/types/Listing";

const props = defineProps<{
    listing: Listing;
}>();

const userStore = useUserStore();
const listingStore = useListingStore();
const route = useRoute();

function immediateResponse(isLike: boolean) {
    const listing = listingStore.listings.find(
        (listing) => listing.id === props.listing.id,
    );
    if (listing == null) {
        return;
    }
    if (isLike) {
        if (listing.does_current_user_dislike) {
            listing.dislike_count--;
        }
        listing.does_current_user_like = !listing.does_current_user_like;
        listing.does_current_user_dislike = false;
        listing.does_current_user_like
            ? listing.like_count++
            : listing.like_count--;
    }

    if (!isLike) {
        if (listing.does_current_user_like) {
            listing.like_count--;
        }
        listing.does_current_user_dislike = !listing.does_current_user_dislike;
        listing.does_current_user_like = false;
        listing.does_current_user_dislike
            ? listing.dislike_count++
            : listing.dislike_count--;
    }
}

async function handleLikeOrDislike(isLike: boolean) {
    immediateResponse(isLike);
    const likeOrDislike = isLike ? "like" : "dislike";
    const path = `/api/listings/${props.listing.id}/${likeOrDislike}`;

    await useApiFetch(path, {
        method: "POST",
    });
    if (route.name === "my-listings") {
        listingStore.fetchMyListings(listingStore.currentPage);
    } else {
        listingStore.fetchAllListings(listingStore.currentPage);
    }
}
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

        <div v-if="listing.price">
            <p class="w-full text-end">
                <UIcon name="fa6-solid:wallet" /> {{ listing.price.amount }}
                {{ listing.price.currency_code }}
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
        <div class="flex mt-5">
            <div class="flex gap-1 items-center">
                <UButton
                    class="duration-500"
                    :color="
                        listing.does_current_user_like ? 'primary' : 'white'
                    "
                    icon="icon-park-outline:thumbs-up"
                    @click="handleLikeOrDislike(true)"
                />
                <p>{{ listing.like_count }}</p>
            </div>
            <div class="flex flex-col">
                <UIcon class="w-5 h-5" name="tabler:minus-vertical" />
                <UIcon class="-mt-3 w-5 h-5" name="tabler:minus-vertical" />
                <UIcon class="-mt-3 w-5 h-5" name="tabler:minus-vertical" />
            </div>
            <div class="flex gap-1 items-center">
                <UButton
                    class="duration-500"
                    :color="
                        listing.does_current_user_dislike ? 'primary' : 'white'
                    "
                    icon="icon-park-outline:thumbs-down"
                    @click="handleLikeOrDislike(false)"
                />
                <p>{{ listing.dislike_count }}</p>
            </div>
        </div>
    </UCard>
</template>

<style scoped></style>
