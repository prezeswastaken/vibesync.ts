<script setup lang="ts">
useHead({ title: "Vibe Sync" });
</script>

<template>
    <UContainer>
        <UCard class="mt-10">
            <div class="flex justify-between">
                <h1>Welcome to VibeSync</h1>
                <ColorScheme
                    ><USelect
                        v-model="$colorMode.preference"
                        :options="['system', 'light', 'dark']"
                /></ColorScheme>
            </div>
            <slot />
        </UCard>
    </UContainer>
</template>

<style scoped></style>
