<script setup lang="ts">
const model = defineModel();
defineEmits(["yes", "no"]);
</script>

<template>
    <UModal v-model="model">
        <p class="mt-4 text-lg font-bold text-center capitalize">
            {{ $t("areYouSure") }}
        </p>
        <div class="flex justify-between p-4">
            <UButton color="white" :label="$t('no')" @click="$emit('no')" />
            <UButton :label="$t('yes')" @click="$emit('yes')" />
        </div>
    </UModal>
</template>

<style scoped></style>
