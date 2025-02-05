import type { Genre } from "./Genre";
import type { Link } from "./Link";
import type { Price } from "./Price";
import type { Tag } from "./Tag";

export type Listing = {
	id: number;
	author: string;
	email: string;
	author_avatar_url: string | null;
	title: string;
	user_id: number;
	body: string;
	price: Price | null;
	is_sale_offer: boolean;
	is_published: boolean;
	created_at: string;
	updated_at: string;
	genres: Genre[];
	tags: Tag[];
	links: Link[];
	like_count: number;
	dislike_count: number;
	does_current_user_like: boolean;
	does_current_user_dislike: boolean;
};

export type CreateListingRequest = {
	title: string;
	body: string;
	is_sale_offer: boolean;
	price: string | number | undefined;
	currency_id: number | string | undefined;
	tag_ids: number[];
	genre_ids: number[];
};

export type EditListingRequest = {
	title: string;
	body: string;
	is_sale_offer: boolean;
	price: string | number | undefined;
	currency_id: number | undefined;
	tag_ids: number[];
	genre_ids: number[];
};
