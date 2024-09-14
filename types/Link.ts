export type Link = {
	id: number;
	url: string;
	listing_id: number;
	created_at: string;
	updated_at: string;
};

export type AddLinkRequest = {
	title: string;
	url: string;
	description: string | null | undefined;
};
