<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

definePageMeta({ middleware: "auth" });
const userStore = useUserStore();

const { t } = useI18n();
const toast = useToast();

const emailForm = ref({
    email: "",
    email_confirmation: "",
});

type ErrorMessages = {
    email: string[];
    email_confirmation: string[];
};

const errorMessages = ref<ErrorMessages | null>(null);

async function handleSubmitEmail() {
    console.log("FORM", emailForm.value);
    errorMessages.value = null;
    const { data, error } = await useApiFetch("/api/email", {
        method: "POST",
        body: emailForm.value,
    });

    if (error.value != null) {
        console.log("EMAIL ERROR", error.value.data.errors.email);
        errorMessages.value = error.value.data.errors;
    } else {
        toast.add({
            title: t("success"),
            description: t("emailUpdated"),
        });
    }
    userStore.fetchUser();
    await navigateTo("/dashboard");
}
</script>

<template>
    <UCard>
        <p class="mb-5">{{ $t("emailMessage") }}</p>
        <form class="flex flex-col gap-4" @submit.prevent="handleSubmitEmail">
            <UFormGroup
                :label="t('newEmail')"
                required
                :error="errorMessages?.email != null && errorMessages?.email[0]"
            >
                <UInput
                    v-model="emailForm.email"
                    placeholder="newEmail@example.com"
                    type="email"
                    icon="i-heroicons-envelope"
                    autofocus
                />
            </UFormGroup>
            <UFormGroup
                :label="t('emailConfirmation')"
                required
                :error="
                    errorMessages?.email_confirmation != null &&
                    errorMessages?.email_confirmation[0]
                "
            >
                <UInput
                    v-model="emailForm.email_confirmation"
                    placeholder="newEmail@example.com"
                    type="email"
                    icon="i-heroicons-envelope"
                />
            </UFormGroup>
            <UButton
                class="self-end w-fit"
                type="submit"
                :label="t('updateEmail')"
            />
        </form>
    </UCard>
</template>
