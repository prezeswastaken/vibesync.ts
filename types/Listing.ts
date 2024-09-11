import type { Link } from "./Link";

export type Listing = {
	id: number;
	author: string;
	author_avatar_url: string | null;
	title: string;
	user_id: number;
	body: string;
	price: number | null | undefined;
	is_sale_order: boolean;
	is_published: boolean;
	created_at: string;
	updated_at: string;
	genres: string[];
	tags: string[];
	links: Link[];
};
