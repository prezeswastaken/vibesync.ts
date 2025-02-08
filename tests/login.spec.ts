import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/login");
	});

	test("should display login form", async ({ page }) => {
		// Check form elements
		await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
		await expect(page.getByPlaceholder("Password123")).toBeVisible();
		const loginButton = page.getByRole("button", { name: "Login" }).first();
		await expect(loginButton).toBeVisible();
	});

	test("should login successfully with correct credentials", async ({
		page,
	}) => {
		// Fill in login form
		await page.getByPlaceholder("you@example.com").fill("test@example.com");
		await page.getByPlaceholder("Password123").fill("password");

		// Click login button
		const loginButton = page.getByRole("button", { name: "Login" }).first();
		await loginButton.click();

		// Should redirect to dashboard
		await page.waitForURL(/.*dashboard/);
		await expect(page).toHaveURL(/.*dashboard/);
	});

	test("should show error with incorrect credentials", async ({ page }) => {
		// Fill in login form with wrong password
		await page.getByPlaceholder("you@example.com").fill("test@example.com");
		await page.getByPlaceholder("Password123").fill("wrongpassword");

		// Click login button
		const loginButton = page.getByRole("button", { name: "Login" }).first();
		await loginButton.click();

		// Wait for error response
		await page.waitForResponse(
			(response) =>
				response.url().includes("/api/login") && response.status() === 401,
		);

		// Should show error message
		await expect(page.getByText("Invalid email or password")).toHaveCount(2);

		// Should stay on login page
		await expect(page).toHaveURL(/.*login/);
	});

	test("should redirect to dashboard if already logged in", async ({
		page,
	}) => {
		// First login
		await page.getByPlaceholder("you@example.com").fill("test@example.com");
		await page.getByPlaceholder("Password123").fill("password");
		await page.getByRole("button", { name: "Login" }).first().click();
		await page.waitForURL(/.*dashboard/);

		// Try to access login page again
		await page.goto("http://localhost:3000/login");

		// Should redirect back to dashboard
		await expect(page).toHaveURL(/.*dashboard/);
	});

	test("should have working social login buttons", async ({ page }) => {
		// Check Google login button
		const googleButton = page.getByRole("button", {
			name: "Login with Google",
		});
		await expect(googleButton).toBeVisible();

		// Check Spotify login button
		const spotifyButton = page.getByRole("button", {
			name: "Login with Spotify",
		});
		await expect(spotifyButton).toBeVisible();
	});
});
