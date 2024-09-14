<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

definePageMeta({
    middleware: "guest",
});

const userStore = useUserStore();

const route = useRoute();

const { t } = useI18n();

const loginData = ref({ email: "", password: "" });

const errorMessage = ref<string | null>(null);

async function handleSubmit() {
    errorMessage.value = null;
    const { error } = await userStore.login(loginData.value);
    if (error.value != null) {
        console.log("ERROR", error);
        errorMessage.value = t("invalidEmailOrPassword");
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
                        :label="t('password')"
                        required
                        :error="errorMessage != null && errorMessage"
                    >
                        <UInput
                            :placeholder="`${t('password')}123`"
                            v-model="loginData.password"
                            type="password"
                            icon="i-heroicons-key"
                        />
                    </UFormGroup>
                    <UDivider />
                    <div class="flex justify-between">
                        <ULink
                            class="text-sm"
                            to="/register"
                            active-class="text-primary"
                            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            {{ $t("dontHaveAnAccountYet") }}
                        </ULink>
                        <UButton type="submit" class="w-min">{{
                            $t("loginSubmit")
                        }}</UButton>
                    </div>
                </form>
            </UCard>
            <LoginWithProvider class="w-full" />
        </div>
    </UCard>
</template>

<style scoped></style>
