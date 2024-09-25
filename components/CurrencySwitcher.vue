<script setup lang="ts">
import { useCurrencyStore } from "~/store/currencyStore";
import { useListingStore } from "~/store/listingStore";

const currencyStore = useCurrencyStore();
currencyStore.fetchCurrencies();

const currentCurrencyId = ref<number | null>(null);

const listingStore = useListingStore();

const { t } = useI18n();

const unchangedOption = computed(() => {
    return { id: 0, code: t("unchanged") };
});

watchEffect(() => {
    if (currentCurrencyId.value != null) {
        listingStore.currentCurrencyId = currentCurrencyId.value;
    }
});
</script>

<template>
    <div class="mb-4">
        <USelectMenu
            v-model="currentCurrencyId"
            :options="[unchangedOption, ...currencyStore.currencies]"
            :placeholder="$t('selectCurrency')"
            value-attribute="id"
            option-attribute="code"
        />
    </div>
</template>

<style scoped></style>
