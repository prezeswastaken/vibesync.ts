import type { Listing } from "./Listing";

export type ListingLikedPayload = {
	listing: Listing;
	nameOfUserWhoLiked: string;
};
