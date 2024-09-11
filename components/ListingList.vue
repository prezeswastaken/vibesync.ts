<script setup lang="ts">
import type { Listing } from "~/types/Listing";

defineProps<{
    listings: Listing[];
}>();
</script>

<template>
    <UCard>
        <ListingPanel
            v-for="listing in listings"
            :key="listing.id"
            :listing="listing"
        />
    </UCard>
</template>

<style scoped></style>
