<script setup lang="ts">
import type { EditListingRequest, Listing } from "~/types/Listing";

const listingStore = useListingStore();

console.log("LISTING", listingStore.currentListing);

import type { Genre } from "~/types/Genre";
import type { Tag } from "~/types/Tag";
import type { CreateListingRequest } from "~/types/Listing";
import { useTagStore } from "~/store/tagStore";
import { useGenreStore } from "~/store/genreStore";
import { useListingStore } from "~/store/listingStore";

const { t } = useI18n();

const form = ref<EditListingRequest>({
    title: listingStore.currentListing?.title ?? "",
    body: listingStore.currentListing?.body ?? "",
    is_sale_offer: listingStore.currentListing?.is_sale_offer ?? false,
    price: listingStore.currentListing?.price ?? undefined,
    tag_ids: listingStore.currentListing?.tags.map((tag) => tag.id) ?? [],
    genre_ids:
        listingStore.currentListing?.genres.map((genre) => genre.id) ?? [],
});

type ErrorMessages = {
    title: string[];
    body: string[];
    is_sale_offer: string[];
    price: string[];
    tag_ids: string[];
    genre_ids: string[];
};

const errorMessages = ref<ErrorMessages | null>(null);

async function handleSubmit() {
    console.log("FORM", form.value);
    errorMessages.value = null;
    const { error } = await useApiFetch(
        `/api/listings/${listingStore.currentListing?.id}`,
        {
            method: "PUT",
            body: form.value,
        },
    );
    if (error.value != null) {
        console.log("TITLE ERROR", error.value.data.errors.title);
        errorMessages.value = error.value.data.errors;
    } else {
        navigateTo("/dashboard");
    }
}

const tagStore = useTagStore();
const genreStore = useGenreStore();

tagStore.fetchTags();
genreStore.fetchGenres();

const tags = computed(() => tagStore.tags);
const genres = computed(() => genreStore.genres);
console.log(tags);

console.log(genres);

watchEffect(() => {
    if (form.value.is_sale_offer === false) {
        form.value.price = undefined;
    }
});
</script>

<template>
    <div>Component: EditListingPanel</div>
    <div class="flex flex-col gap-4">
        <UFormGroup
            :label="$t('title')"
            required
            :error="errorMessages?.title != null && errorMessages?.title[0]"
        >
            <UInput v-model="form.title" :placeholder="$t('title')" />
        </UFormGroup>
        <UFormGroup
            :label="$t('body')"
            required
            :error="errorMessages?.body != null && errorMessages?.body[0]"
        >
            <UTextarea
                v-model="form.body"
                :placeholder="$t('body')"
                :rows="5"
            />
        </UFormGroup>
        <UCheckbox v-model="form.is_sale_offer" :label="$t('isSaleOffer')" />
        <UFormGroup
            :label="$t('price')"
            v-if="form.is_sale_offer"
            :error="errorMessages?.price != null && errorMessages?.price[0]"
        >
            <UInput v-model="form.price" type="number" placeholder="Price" />
        </UFormGroup>
        <UFormGroup
            :label="t('tags')"
            required
            :error="errorMessages?.tag_ids != null && errorMessages?.tag_ids[0]"
        >
            <USelectMenu
                v-model="form.tag_ids"
                :options="tags"
                multiple
                :placeholder="$t('selectTags')"
                value-attribute="id"
                option-attribute="name"
            />
        </UFormGroup>
        <UFormGroup
            :label="t('genres')"
            required
            :error="
                errorMessages?.genre_ids != null && errorMessages?.genre_ids[0]
            "
        >
            <USelectMenu
                v-model="form.genre_ids"
                :options="genres"
                multiple
                :placeholder="$t('selectGenres')"
                value-attribute="id"
                option-attribute="name"
            />
        </UFormGroup>
        <UDivider />
        <div class="flex justify-between w-full">
            <UButton
                :label="$t('close')"
                @click="
                    () => {
                        $emit('close');
                    }
                "
                color="white"
            />
            <UButton
                :label="$t('createListing')"
                class="self-end w-fit"
                @click="handleSubmit"
            />
        </div>
        <AddLinksPanel />
    </div>
</template>

<style scoped></style>
