<script setup lang="ts">
import { useI18n } from "vue-i18n";

definePageMeta({
    middleware: "guest",
});

const { t } = useI18n();

const features = [
    {
        icon: "i-lucide-music",
        title: "features.beats.title",
        description: "features.beats.description",
    },
    {
        icon: "i-lucide-mic",
        title: "features.vocals.title",
        description: "features.vocals.description",
    },
    {
        icon: "i-lucide-waveform",
        title: "features.audio.title",
        description: "features.audio.description",
    },
];
</script>

<template>
    <div class="min-h-screen text-gray-100 bg-gray-900">
        <!-- Hero Section -->
        <div class="relative py-24 px-6">
            <div class="mx-auto max-w-7xl text-center">
                <h1 class="mb-6 text-5xl font-bold">
                    {{ $t("hero.title") }}
                    <span class="text-orange-500">{{
                        $t("hero.highlight")
                    }}</span>
                </h1>
                <p class="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
                    {{ $t("hero.description") }}
                </p>
                <div class="flex gap-4 justify-center">
                    <NuxtLink
                        to="/register"
                        class="py-3 px-6 font-semibold text-white bg-orange-500 rounded-lg transition hover:bg-orange-600"
                    >
                        {{ $t("register") }}
                    </NuxtLink>
                    <NuxtLink
                        to="/login"
                        class="py-3 px-6 font-semibold text-orange-500 rounded-lg border border-orange-500 transition hover:text-white hover:bg-orange-500"
                    >
                        {{ $t("login") }}
                    </NuxtLink>
                </div>
            </div>
        </div>
        <!-- Features Section -->
        <div class="py-16 px-6 mx-auto max-w-7xl">
            <div class="grid gap-8 md:grid-cols-3">
                <div
                    v-for="(feature, index) in features"
                    :key="index"
                    class="p-6 bg-gray-800 rounded-lg transition hover:bg-gray-750"
                >
                    <div class="mb-4">
                        <div
                            :class="[feature.icon, 'w-8 h-8 text-orange-500']"
                        ></div>
                    </div>
                    <h3 class="mb-2 text-xl font-semibold">
                        {{ $t(feature.title) }}
                    </h3>
                    <p class="text-gray-400">{{ $t(feature.description) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
