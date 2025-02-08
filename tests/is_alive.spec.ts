import { test, expect } from "@playwright/test";

test("is website alive", async ({ page }) => {
	await page.goto("http://localhost:3000/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Vibe Sync/);
});
