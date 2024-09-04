<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
import type { LoginResponse } from "~/types/User";

const userStore = useUserStore();

const loginData = ref({ email: "", password: "" });

async function handleSubmit() {
    await userStore.login(loginData.value);
    console.log(userStore.user);
}
</script>

<template>
    <UCard>
        <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
            <UInput v-model="loginData.email" label="Email" />
            <UInput v-model="loginData.password" label="Password" />
            <UButton type="submit" class="w-min">Login</UButton>
        </form>
    </UCard>
</template>

<style scoped></style>
