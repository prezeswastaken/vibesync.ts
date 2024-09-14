<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

definePageMeta({
    middleware: "guest",
});

const { t } = useI18n();

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
    <UCard>
        <div class="flex">
            <UCard class="w-full">
                <form
                    class="flex flex-col gap-4"
                    @submit.prevent="handleSubmit"
                >
                    <UFormGroup
                        :label="t('email')"
                        required
                        :error="
                            errorMessages?.email != null &&
                            errorMessages?.email[0]
                        "
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
                        :label="t('name')"
                        required
                        :error="
                            errorMessages?.name != null &&
                            errorMessages?.name[0]
                        "
                    >
                        <UInput
                            v-model="loginData.name"
                            :placeholder="t('johnDoe')"
                            type="text"
                            icon="i-heroicons-user"
                        />
                    </UFormGroup>
                    <UFormGroup
                        :label="t('password')"
                        required
                        :error="
                            errorMessages?.password != null &&
                            errorMessages?.password[0]
                        "
                    >
                        <UInput
                            :placeholder="`${t('password')}123`"
                            v-model="loginData.password"
                            label="Password"
                            type="password"
                            icon="i-heroicons-key"
                        />
                    </UFormGroup>
                    <UFormGroup
                        :label="t('passwordConfirmation')"
                        required
                        :error="
                            errorMessages?.password_confirmation != null &&
                            errorMessages?.password_confirmation[0]
                        "
                    >
                        <UInput
                            :placeholder="`${t('password')}123`"
                            v-model="loginData.password_confirmation"
                            label="Password"
                            type="password"
                            icon="i-heroicons-key"
                        />
                    </UFormGroup>
                    <UDivider />
                    <div class="flex justify-between">
                        <ULink
                            class="text-sm"
                            to="/login"
                            active-class="text-primary"
                            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            {{ $t("alreadyHaveAnAccount") }}
                        </ULink>
                        <UButton type="submit" class="w-min">{{
                            $t("registerSubmit")
                        }}</UButton>
                    </div>
                </form>
            </UCard>
            <LoginWithProvider class="w-full" />
        </div>
    </UCard>
</template>

<style scoped></style>
