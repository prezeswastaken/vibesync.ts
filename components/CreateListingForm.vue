<script setup lang="ts">
import type { Genre } from "~/types/Genre";
import type { Tag } from "~/types/Tag";
import type { CreateListingRequest } from "~/types/Listing";

defineEmits(["close"]);

const form = ref<CreateListingRequest>({
    title: "",
    body: "",
    is_sale_offer: false,
    price: undefined,
    tag_ids: [],
    genre_ids: [],
});

const [tagsResponse, genresResponse] = await Promise.all([
    useApiFetch<Tag[]>("/api/tags"),
    useApiFetch<Genre[]>("/api/genres"),
]);

const tags = ref(tagsResponse.data.value);
console.log(tags);

const genres = ref(genresResponse.data.value);
console.log(genres);

watchEffect(() => {
    if (form.value.is_sale_offer === false) {
        form.value.price = undefined;
    }
});

function handleSubmit() {
    console.log(form.value);
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <UFormGroup label="Title" required>
            <UInput v-model="form.title" placeholder="Title" autofocus />
        </UFormGroup>
        <UFormGroup label="Body" required>
            <UTextarea v-model="form.body" placeholder="Body" :rows="5" />
        </UFormGroup>
        <UCheckbox v-model="form.is_sale_offer" label="Is this a sale offer?" />
        <UFormGroup label="Price" v-if="form.is_sale_offer">
            <UInput v-model="form.price" type="number" placeholder="Price" />
        </UFormGroup>
        <UFormGroup label="Tags" required>
            <USelectMenu
                v-model="form.tag_ids"
                :options="tags"
                multiple
                placeholder="Select tags"
                value-attribute="id"
                option-attribute="name"
            />
        </UFormGroup>
        <UFormGroup label="Genres" required>
            <USelectMenu
                v-model="form.genre_ids"
                :options="genres"
                multiple
                placeholder="Select genres"
                value-attribute="id"
                option-attribute="name"
            />
        </UFormGroup>
        <UDivider />
        <div class="flex justify-between w-full">
            <UButton
                label="CLOSE"
                @click="
                    () => {
                        $emit('close');
                    }
                "
                color="white"
            />
            <UButton
                label="Create listing"
                class="self-end w-fit"
                @click="handleSubmit"
            />
        </div>
    </div>
</template>

<style scoped></style>
