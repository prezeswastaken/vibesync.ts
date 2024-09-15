<script setup lang="ts">
const { locale, setLocale } = useI18n();
import { useLocaleStore } from "~/store/localeStore";
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();

const options = [
    {
        name: "English",
        value: "en",
    },
    {
        name: "Polish",
        value: "pl",
    },
];

const localeStore = useLocaleStore();

const language = ref(localeStore.locale);

onMounted(() => {
    language.value = localeStore.locale;
    setLocale(language.value);
});

watchEffect(() => {
    localeStore.setLocaleInStore(language.value);
    setLocale(language.value);
});

console.log("LANGUAGE", language.value);

const iconClass = computed(() => {
    return language.value === "pl" ? "i-flag-pl-1x1" : "i-flag-us-1x1";
});
</script>

<template>
    <div
        class="flex flex-col justify-center w-16"
        :class="userStore.isLoggedIn ? '' : ' mr-5'"
    >
        <USelect
            :icon="iconClass"
            color="white"
            size="sm"
            :options="options"
            placeholder="Select language"
            v-model="language"
            option-attribute="name"
        />
    </div>
</template>

<style scoped></style>
