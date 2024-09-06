<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

definePageMeta({
    middleware: "guest",
});

const userStore = useUserStore();

const loginData = ref({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
});

type ErrorMessages = {
    email: string[];
    name: string[];
    password: string[];
    password_confirmation: string[];
};

const errorMessages = ref<ErrorMessages | null>(null);

async function handleSubmit() {
    errorMessages.value = null;
    const { error } = await userStore.register(loginData.value);
    if (error.value != null) {
        console.log("EMAIL ERROR", error.value.data.email);
        errorMessages.value = error.value.data;
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
                :error="errorMessages?.email != null && errorMessages?.email[0]"
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
                label="Name"
                required
                :error="errorMessages?.name != null && errorMessages?.name[0]"
            >
                <UInput
                    v-model="loginData.name"
                    placeholder="John Doe"
                    type="text"
                    icon="i-heroicons-user"
                />
            </UFormGroup>
            <UFormGroup
                label="Password"
                required
                :error="
                    errorMessages?.password != null &&
                    errorMessages?.password[0]
                "
            >
                <UInput
                    placeholder="password"
                    v-model="loginData.password"
                    label="Password"
                    type="password"
                    icon="i-heroicons-key"
                />
            </UFormGroup>
            <UFormGroup
                label="Password confirmation"
                required
                :error="
                    errorMessages?.password_confirmation != null &&
                    errorMessages?.password_confirmation[0]
                "
            >
                <UInput
                    placeholder="password"
                    v-model="loginData.password_confirmation"
                    label="Password"
                    type="password"
                    icon="i-heroicons-key"
                />
            </UFormGroup>
            <div class="flex justify-between">
                <ULink
                    class="text-sm"
                    to="/login"
                    active-class="text-primary"
                    inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    Already have an account?
                </ULink>
                <UButton type="submit" class="w-min">Register</UButton>
            </div>
        </form>
    </UCard>
</template>

<style scoped></style>
