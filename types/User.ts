export type UserType = {
	id: number;
	name: string;
	email: string | null;
	accessToken: string | null;
	avatar_url: string | null;
	spotify_id: string | null;
	google_id: string | null;
	is_admin: boolean;
};

export type RegisterFormType = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

export type LoginFormType = {
	email: string;
	password: string;
};

export type LoginResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	user: UserType;
};

export type RegisterResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	user: UserType;
};

export type RefreshResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	user: UserType;
};
