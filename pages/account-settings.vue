<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
const { t } = useI18n();

const toast = useToast();

const userStore = useUserStore();

const errorMessages = ref<ErrorMessages | null>(null);

const isSocialiteUser = computed(
    () =>
        userStore.user?.spotify_id != null || userStore.user?.google_id != null,
);

const nameForm = ref({
    name: userStore.user?.name ?? "",
});

const passwordForm = ref({
    current_password: "",
    password: "",
    password_confirmation: "",
});

async function handleSubmitName() {
    console.log("FORM", nameForm.value);
    errorMessages.value = null;
    const { data, error } = await useApiFetch("/api/account", {
        method: "PATCH",
        body: nameForm.value,
    });
    if (error.value != null) {
        console.log("NAME ERROR", error.value.data.errors.name);
        errorMessages.value = error.value.data.errors;
    } else {
        toast.add({
            title: t("success"),
            description: t("nameUpdated"),
        });
    }
    userStore.fetchUser();
}

async function handleSubmitPassword() {
    console.log("FORM", passwordForm.value);
    errorMessages.value = null;
    const { data, error } = await useApiFetch("/api/account", {
        method: "PATCH",
        body: passwordForm.value,
    });

    if (error.value != null) {
        console.log("PASSWORD ERROR", error.value.data.errors.password);
        errorMessages.value = error.value.data.errors;
    } else {
        toast.add({
            title: t("success"),
            description: t("passwordUpdated"),
        });
    }
    userStore.fetchUser();
}

type ErrorMessages = {
    name: string[];
    current_password: string[];
    password_confirmation: string[];
    password: string[];
};
</script>

<template>
    <UCard class="mt-5 mb-5">
        <form class="flex flex-col gap-4" @submit.prevent="handleSubmitName">
            <UFormGroup
                :label="t('newName')"
                required
                :error="errorMessages?.name != null && errorMessages?.name[0]"
            >
                <UInput
                    v-model="nameForm.name"
                    placeholder="username"
                    type="text"
                    icon="i-heroicons-user"
                    autofocus
                />
            </UFormGroup>
            <UButton
                class="self-end w-fit"
                type="submit"
                :label="t('updateName')"
            />
        </form>
    </UCard>
    <UCard>
        <form
            v-if="!isSocialiteUser"
            class="flex flex-col gap-4"
            @submit.prevent="handleSubmitPassword"
        >
            <UFormGroup
                :label="t('currentPassword')"
                required
                :error="
                    errorMessages?.current_password != null &&
                    errorMessages?.current_password[0]
                "
            >
                <UInput
                    v-model="passwordForm.current_password"
                    placeholder="password123"
                    type="password"
                    icon="i-heroicons-key"
                    autofocus
                />
            </UFormGroup>
            <UFormGroup
                :label="t('newPassword')"
                required
                :error="
                    errorMessages?.password != null &&
                    errorMessages?.password[0]
                "
            >
                <UInput
                    v-model="passwordForm.password"
                    placeholder="new_password123"
                    type="password"
                    icon="i-heroicons-key"
                    autofocus
                />
            </UFormGroup>
            <UFormGroup
                :label="t('newPasswordConfirmation')"
                required
                :error="
                    errorMessages?.password_confirmation != null &&
                    errorMessages?.password[0]
                "
            >
                <UInput
                    v-model="passwordForm.password_confirmation"
                    placeholder="new_password123"
                    type="password"
                    icon="i-heroicons-key"
                    autofocus
                />
            </UFormGroup>
            <UButton
                class="self-end w-fit"
                type="submit"
                :label="t('updatePassword')"
            />
        </form>
    </UCard>
</template>

<style scoped></style>
