<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

useHead({ title: "Vibe Sync" });
const userStore = useUserStore();
// if userStore.hasRefresh == false, refresh the page
</script>

<template>
    <UCard>
        <UContainer>
            <TopBar />
            <UCard class="mt-20">
                <div class="flex justify-between">
                    <div />
                    <ColorScheme
                        ><USelect
                            v-model="$colorMode.preference"
                            :options="['system', 'light', 'dark']"
                    /></ColorScheme>
                </div>
                <slot />
            </UCard>
        </UContainer>
    </UCard>
</template>

<style scoped></style>
