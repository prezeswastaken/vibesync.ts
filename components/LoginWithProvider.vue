<script setup lang="ts">
function redirectToProvider(provider: string) {
    const config = useRuntimeConfig();
    const backendUrl = config.public.laravelApiUrl;
    return navigateTo(`${backendUrl}/${provider}`, { external: true });
}
</script>

<template>
    <div class="flex flex-col gap-5 justify-center items-center w-full">
        <p class="text-lg">{{ $t("or") }}</p>
        <UDivider />
        <UButton
            @click="redirectToProvider('google')"
            color="white"
            icon="logos:google-icon"
            >{{ $t("loginWithGoogle") }}</UButton
        >
        <UButton
            @click="redirectToProvider('spotify')"
            color="white"
            icon="logos:spotify-icon"
            >{{ $t("loginWithSpotify") }}</UButton
        >
    </div>
</template>

<style scoped></style>
