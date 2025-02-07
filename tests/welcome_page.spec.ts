import { test, expect } from "@playwright/test";

test.describe("Welcome Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("http://localhost:3000/");
	});

	test("should display correct title", async ({ page }) => {
		await expect(page).toHaveTitle(/Vibe Sync/);
	});

	test("should display hero section with correct content", async ({ page }) => {
		// Check logo
		await expect(page.getByRole("img", { name: "Logo" })).toBeVisible();

		// Check main heading
		const heading = page.getByRole("heading", { level: 1 });
		await expect(heading).toContainText("Where Music Makers");
		await expect(heading).toContainText("Connect");

		// Check description
		await expect(
			page.getByText(
				/Your marketplace for beats, vocals, and professional audio services/,
			),
		).toBeVisible();
	});

	test("should display all feature cards", async ({ page }) => {
		// Check for three feature cards
		const features = page.locator(".grid > div");
		await expect(features).toHaveCount(3);

		// Check specific feature content
		await expect(page.getByText("Beats & Instrumentals")).toBeVisible();
		await expect(page.getByText("Vocal Services")).toBeVisible();
		await expect(page.getByText("Audio Engineering")).toBeVisible();
	});

	test("should have working navigation buttons", async ({ page }) => {
		// Check register button in hero section
		const registerButton = page
			.locator('a[href="/register"]')
			.filter({ hasText: /^Register$/ });
		await expect(registerButton).toBeVisible();
		await expect(registerButton).toHaveAttribute("href", "/register");

		// Check login button in hero section
		const loginButton = page
			.locator('a[href="/login"]')
			.filter({ hasText: /^Login$/ });
		await expect(loginButton).toBeVisible();
		await expect(loginButton).toHaveAttribute("href", "/login");
	});
});
