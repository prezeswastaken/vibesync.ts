<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();

type OtherUser = {
    id: string;
    name: string;
    email: string;
};

const search = ref("");
const users = ref<OtherUser[] | null>(null);

const userIDToDelete = ref<null | number>(null);
const isDeleting = ref(false);

async function fetchUsers() {
    const { data, error } = await useApiFetch<Array<OtherUser>>(
        `/api/search-users?q=${search.value}`,
    );
    users.value = data?.value;
}

async function handleDelete() {
    await useApiFetch(`/api/users/${userIDToDelete.value}`, {
        method: "DELETE",
    });

    userIDToDelete.value = null;
    isDeleting.value = false;
    await fetchUsers();
}
</script>

<template>
    <UCard>
        <form @submit.prevent="fetchUsers" class="flex flex-col gap-5">
            <UInput
                autofocus
                type="text"
                v-model="search"
                placeholder="User name or email"
            />
            <UButton label="SEARCH" type="submit" class="self-end w-fit" />
        </form>
    </UCard>
    <UCard class="grid grid-cols-2 gap-2" v-if="(users?.length ?? 0) > 0">
        <UCard v-for="user in users" :key="user.id" class="mt-5">
            <NuxtLink
                class="relative user-link group"
                :to="`/profile/${user.id}`"
            >
                <div class="flex gap-2 justify-between items-center">
                    <div class="flex gap-2 items-center">
                        <UIcon name="i-heroicons-envelope" />
                        <p>{{ user.name }}</p>
                    </div>
                    <div class="flex flex-col gap-1 items-end">
                        <div
                            v-if="user.email === userStore.user?.email"
                            class="flex gap-2 items-center text-yellow-500"
                        >
                            <p>You</p>
                            <UIcon name="i-heroicons-star" />
                        </div>
                        <button
                            v-if="
                                userStore.user?.is_admin &&
                                user.email !== userStore.user?.email
                            "
                            @click.prevent="
                                () => {
                                    console.log(
                                        'Deleting user with id',
                                        user.id,
                                    );
                                    isDeleting = true;
                                    userIDToDelete = Number(user.id);
                                }
                            "
                            class="p-1 text-gray-500 opacity-0 transition-colors group-hover:opacity-100 hover:text-red-500"
                            aria-label="Delete user"
                        >
                            <UIcon name="i-heroicons-trash" />
                        </button>
                    </div>
                </div>
                <div class="flex gap-2 items-center">
                    <UIcon name="i-heroicons-user" />
                    <p>{{ user.email }}</p>
                </div>
            </NuxtLink>
        </UCard>
        <AreYouSureModal
            v-model="isDeleting"
            @yes="handleDelete"
            @no="
                () => {
                    isDeleting = false;
                    userIDToDelete = null;
                }
            "
        />
    </UCard>
    <UCard class="mt-5" v-if="users != null && users.length === 0">
        <p>No users found</p>
    </UCard>
</template>

<style scoped>
.user-link {
    transition:
        background-color 0.2s ease,
        color 0.2s ease;
    padding: 0.5rem;
    border-radius: 0.5rem;
}
.user-link:hover {
    color: #2b6cb0;
}
</style>
