<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
import type { ListingLikedPayload } from "~/types/Events";

const userStore = useUserStore();

const toast = useToast();

const confetti = useConfetti();

const channelName = `user.${userStore.user?.id}`;
const echo = useEcho();

onMounted(() => {
    console.log(echo);
    echo.private(channelName).listen(
        "ListingLiked",
        (e: ListingLikedPayload) => {
            console.log("EVENT", e);
            confetti.addConfetti();
            toast.add({
                title: "Listing Liked",
                description: `Your listing ${e.listing.title} was liked by ${e.nameOfUserWhoLiked}`,
            });
        },
    );
    userStore.socketId = echo.socketId();

    console.log("WS::socketId() : ", echo.socketId());
});

onUnmounted(() => {
    echo.leave(channelName);
});
</script>

<template></template>

<style scoped></style>
