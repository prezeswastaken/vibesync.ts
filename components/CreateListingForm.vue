<script setup lang="ts">
import type { Genre } from "~/types/Genre";
import type { Tag } from "~/types/Tag";
import type { CreateListingRequest, Listing } from "~/types/Listing";
import { useTagStore } from "~/store/tagStore";
import { useGenreStore } from "~/store/genreStore";

const emit = defineEmits(["close"]);

const { t } = useI18n();

const form = ref<CreateListingRequest>({
    title: "",
    body: "",
    is_sale_offer: false,
    price: undefined,
    tag_ids: [],
    genre_ids: [],
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
    const { data, error } = await useApiFetch<Listing>("/api/listings", {
        method: "POST",
        body: form.value,
    });
    if (error.value != null) {
        console.log("TITLE ERROR", error.value.data.errors.title);
        errorMessages.value = error.value.data.errors;
    } else {
        navigateTo(`/edit/listings/${data.value?.id}`);
        emit("close");
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
    <div class="flex flex-col gap-4" v-auto-animate>
        <UFormGroup
            :label="$t('title')"
            required
            :error="errorMessages?.title != null && errorMessages?.title[0]"
        >
            <UInput v-model="form.title" :placeholder="$t('title')" autofocus />
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
            <div></div>
            <UButton
                :label="$t('proceed')"
                class="self-end w-fit"
                @click="handleSubmit"
                :title="$t('proceed')"
            />
        </div>
    </div>
</template>

<style scoped></style>
