<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

definePageMeta({
    middleware: "guest",
});

const userStore = useUserStore();

const loginData = ref({ email: "", password: "" });

const errorMessage = ref<string | null>(null);

async function handleSubmit() {
    errorMessage.value = null;
    const { error } = await userStore.login(loginData.value);
    if (error.value != null) {
        console.log("ERROR", error);
        errorMessage.value = "Invalid email or password";
    } else {
        navigateTo("/dashboard");
    }
    console.log(userStore.user);
}
</script>

<template>
    <UCard class="md:w-1/2">
        <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
            <UFormGroup
                label="Email"
                required
                :error="errorMessage != null && errorMessage"
            >
                <UInput
                    v-model="loginData.email"
                    placeholder="you@example.com"
                    type="email"
                    icon="i-heroicons-envelope"
                    autofocus
                />
            </UFormGroup>
            <UFormGroup
                label="Password"
                required
                :error="errorMessage != null && errorMessage"
            >
                <UInput
                    placeholder="password"
                    v-model="loginData.password"
                    label="Password"
                    type="password"
                    icon="i-heroicons-key"
                />
            </UFormGroup>
            <div class="flex justify-between">
                <ULink
                    class="text-sm"
                    to="/register"
                    active-class="text-primary"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Don't have an account yet?
                </ULink>
                <UButton type="submit" class="w-min">Login</UButton>
            </div>
        </form>
    </UCard>
</template>

<style scoped></style>
