// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});
test("Find items by search", async ({ page }) => {
  // await page.goto("http://localhost:3000/");

  await page.locator(".search__input").fill("n");

  await expect(page.locator(".folder__container_name")).toHaveText("main");
  await expect(page.locator(".file__name").first()).toHaveText(
    "Now-you`r-gone.mp3"
  );

  await expect(page.locator(".file__name").nth(1)).toHaveText("package.json");
});
