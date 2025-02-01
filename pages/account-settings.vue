<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

const toast = useToast();

const userStore = useUserStore();

const errorMessages = ref<ErrorMessages | null>(null);

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
            title: "Success",
            description: "Name updated",
        });
    }
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
            title: "Success",
            description: "Name password",
        });
    }
}

type ErrorMessages = {
    name: string[];
    current_password: string[];
    password_confirmation: string[];
    password: string[];
};
</script>

<template>
    <div>Page: account-settings</div>
</template>

<style scoped></style>
