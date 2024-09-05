<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();
const userName = ref(userStore.user?.name);
</script>

<template>
    <div>Hello {{ userName }}</div>
</template>

<style scoped></style>
