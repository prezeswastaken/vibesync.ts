<script setup lang="ts">
import { useListingStore } from "~/store/listingStore";
import type { Link } from "~/types/Link";

const props = defineProps<{}>();
const form = ref({
    url: "",
});

const listingStore = useListingStore();

type ErrorMessages = {
    url: string[];
};

const errorMessages = ref<ErrorMessages | null>(null);

async function handleSubmit() {
    errorMessages.value = null;
    if (!form.value.url.startsWith("http")) {
        form.value.url = `https://${form.value.url}`;
    }
    const { data, error } = await useApiFetch<Link>(
        `/api/listings/${listingStore.currentListing?.id}/links`,
        {
            method: "POST",
            body: form.value,
        },
    );

    if (error.value != null) {
        errorMessages.value = error.value.data.errors;
    } else if (data.value != null) {
        const listingID = listingStore.currentListing?.id;
        if (listingID == null) {
            return;
        }
        listingStore.fetchListingByID(listingID);
        form.value.url = "";
    }
}

function removeLink(linkID: number) {
    const listingID = listingStore.currentListing?.id;
    if (listingID == null) {
        return;
    }
    useApiFetch(`/api/links/${linkID}`, {
        method: "DELETE",
    });
    listingStore.fetchListingByID(listingID);
}
</script>

<template>
    <p class="text-lg font-semibold">{{ $t("links") }}</p>
    <div class="flex flex-col" v-auto-animate>
        <div
            class="flex items-center"
            v-for="link in listingStore.currentListing?.links ?? []"
            :key="link.id"
        >
            <NuxtLink :to="link.url" target="_blank" class="w-fit"
                ><UIcon name="mdi-light:link-variant" class="mr-2" />{{
                    link.url
                }}
            </NuxtLink>
            <UButton
                color="white"
                icon="mdi-light:delete"
                class="ml-2"
                @click="() => removeLink(link.id)"
            />
        </div>
    </div>
    <UFormGroup
        class="mt-4"
        label="URL"
        required
        :error="errorMessages?.url != null && errorMessages?.url[0]"
    >
        <div class="flex">
            <UInput
                class="w-full"
                v-model="form.url"
                placeholder="https://example.com"
            />
            <UButton
                color="white"
                class="ml-2"
                :label="$t('addLink')"
                @click="handleSubmit"
            />
        </div>
    </UFormGroup>
</template>

<style scoped></style>
