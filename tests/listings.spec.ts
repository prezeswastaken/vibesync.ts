import { test, expect } from "@playwright/test";

// Increase timeout for the entire test suite
test.setTimeout(30000);

test.describe("Listings Page", () => {
	// Setup: Login before each test
	test.beforeEach(async ({ page }) => {
		// Go to login page
		await page.goto("http://localhost:3000/login");

		// Fill in login form
		await page.getByPlaceholder("you@example.com").fill("test@example.com");
		await page.getByPlaceholder("Password123").fill("password");

		// Submit login form
		const loginButton = page.getByRole("button", { name: "Login" }).first();
		await loginButton.waitFor({ state: "visible" });
		await loginButton.click();

		// Wait for successful login response
		const loginResponse = await page.waitForResponse(
			(response) =>
				response.url().includes("/api/login") && response.status() === 200,
		);

		// Get the token from the response
		const responseData = await loginResponse.json();

		// Set the token in localStorage
		await page.evaluate((token) => {
			localStorage.setItem("accessToken", token);
		}, responseData.access_token);

		// Navigate to dashboard and wait for listings
		await page.goto("http://localhost:3000/dashboard");

		// Wait for listings API response
		await page.waitForResponse(
			(response) =>
				response.url().includes("/api/listings") && response.status() === 200,
		);
	});

	test("should display listings page title", async ({ page }) => {
		const heading = page.getByRole("heading", { name: "Listings" });
		await heading.waitFor({ state: "visible" });
		await expect(heading).toBeVisible();
	});

	test("should display listing cards with correct information", async ({
		page,
	}) => {
		// Wait for listings to load
		await page.waitForSelector("div.mt-5", { timeout: 10000 }); // ListingPanel class

		// Check listing cards exist
		const firstCard = page.locator("div.mt-5").first();
		await expect(firstCard).toHaveCount(1);

		// Check first listing card content
		await expect(firstCard.locator("div.text-lg.font-bold")).toBeVisible(); // Title
	});
});
