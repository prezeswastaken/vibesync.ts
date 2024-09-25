<script setup lang="ts">
import type { Genre } from "~/types/Genre";
import type { Tag } from "~/types/Tag";
import type { CreateListingRequest } from "~/types/Listing";
import { useTagStore } from "~/store/tagStore";
import { useGenreStore } from "~/store/genreStore";
import { useListingStore } from "~/store/listingStore";
import type { EditListingRequest, Listing } from "~/types/Listing";
import { useCurrencyStore } from "~/store/currencyStore";

const { t } = useI18n();

const listingStore = useListingStore();

const submitLabel = computed(() => {
    return listingStore.currentListing?.is_published
        ? t("saveChanges")
        : t("saveAndPublish");
});

console.log("LISTING", listingStore.currentListing);

const form = ref<EditListingRequest>({
    title: listingStore.currentListing?.title ?? "",
    body: listingStore.currentListing?.body ?? "",
    is_sale_offer: listingStore.currentListing?.is_sale_offer ?? false,
    price: listingStore.currentListing?.price?.amount ?? undefined,
    currency_id: listingStore.currentListing?.price?.currency_id ?? undefined,
    tag_ids: listingStore.currentListing?.tags.map((tag) => tag.id) ?? [],
    genre_ids:
        listingStore.currentListing?.genres.map((genre) => genre.id) ?? [],
});

type ErrorMessages = {
    title: string[];
    body: string[];
    is_sale_offer: string[];
    price: string[];
    currency_id: string[];
    tag_ids: string[];
    genre_ids: string[];
};

const errorMessages = ref<ErrorMessages | null>(null);

async function handleSubmit(publish: boolean) {
    console.log("FORM", form.value);
    errorMessages.value = null;
    const { data, error } = await useApiFetch<Listing>(
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
        if (publish && data.value?.is_published === false) {
            await useApiFetch(`/api/listings/${data.value.id}/publish`, {
                method: "POST",
            });
        }
        navigateTo("/dashboard");
    }
}

const tagStore = useTagStore();
const genreStore = useGenreStore();
const currencyStore = useCurrencyStore();

tagStore.fetchTags();
genreStore.fetchGenres();
currencyStore.fetchCurrencies();

const tags = computed(() => tagStore.tags);
const genres = computed(() => genreStore.genres);
const currencies = computed(() => currencyStore.currencies);
console.log(tags);

console.log(genres);

watchEffect(() => {
    if (form.value.is_sale_offer === false) {
        form.value.price = undefined;
    }
});

const isDeleting = ref(false);

async function handleDelete() {
    if (!isDeleting.value) {
        isDeleting.value = true;
        return;
    }
    const id = listingStore.currentListing?.id;
    if (id == null) {
        return;
    }
    await listingStore.deleteListing(id);
    isDeleting.value = false;
    navigateTo("/my-listings");
}
</script>

<template>
    <div class="flex justify-end" title="Delete listing">
        <UButton
            icon="ant-design:delete-outlined"
            color="white"
            @click="handleDelete"
        />
    </div>
    <div class="flex flex-col gap-4">
        <p
            v-if="!listingStore.currentListing?.is_published"
            class="text-orange-300 lowercase"
        >
            ( {{ $t("unpublished") }} )
        </p>
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
            :label="$t('selectCurrency')"
            v-if="form.is_sale_offer"
            :error="
                errorMessages?.currency_id != null &&
                errorMessages?.currency_id[0]
            "
        >
            <USelectMenu
                v-model="form.currency_id"
                :options="currencies"
                :placeholder="$t('selectCurrency')"
                value-attribute="id"
                option-attribute="code"
            />
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
        <AddLinksPanel />
        <UDivider />
        <div class="flex justify-between w-full">
            <UButton
                :label="$t('discardChanges')"
                @click="
                    () => {
                        navigateTo('/dashboard');
                    }
                "
                color="white"
            />
            <UButton
                v-if="!listingStore.currentListing?.is_published"
                :label="$t('saveWithoutPublishing')"
                color="white"
                @click="handleSubmit(false)"
            />
            <UButton
                :label="submitLabel"
                class="self-end w-fit"
                @click="handleSubmit(true)"
            />
        </div>
        <AreYouSureModal
            v-model="isDeleting"
            @yes="handleDelete"
            @no="() => (isDeleting = false)"
        />
    </div>
</template>

<style scoped></style>
