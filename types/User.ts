export type UserType = {
	name: string;
	email: string;
	accessToken: string | null;
	avatarUrl: string | null;
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

export type RefreshResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	user: UserType;
};
