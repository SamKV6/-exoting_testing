import { test, expect } from '@playwright/test';
import { search, cart, favorites } from '../page-objects/selectors';

// ================================================================
// TC-03 · ПОИСК
// ================================================================
test.describe('TC-03 Поиск', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ввод случайных символов даёт пустой результат', async ({ page }) => {
    const input = page.locator(search.input).first();
    await expect(input).toBeVisible();
    await input.click();
    await input.fill('zxqwvbnm12345');
    await page.waitForTimeout(1000);
    await input.press('Enter');
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('body')).toContainText(search.emptyState, {
      timeout: 10_000,
    });
  });

  test('ввод неполного названия: работает автодополнение и поиск', async ({ page }) => {
    const input = page.locator(search.input).first();
    await expect(input).toBeVisible();
    await input.click();
    await input.fill('корм');

    const suggestionsBox = page.locator(search.suggestions);
    await expect(suggestionsBox).toBeVisible({ timeout: 5_000 });

    const items = page.locator(search.suggestionItem);
    await expect(items.first()).toBeVisible();
    expect(await items.count()).toBeGreaterThan(0);

    await items.first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/search|query|\/catalog/i);
  });
});

// ================================================================
// TC-04 · КОРЗИНА И ИЗБРАННОЕ
// ================================================================
test.describe('TC-04 Корзина и избранное', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('добавление товара увеличивает счётчик корзины', async ({ page }) => {
    const counter = page.locator(cart.counter).first();
    await expect(counter).toBeVisible();

    const before = parseInt((await counter.textContent())?.trim() || '0', 10) || 0;

    const addBtn = page.locator(cart.addBtn).first();
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    await expect(async () => {
      const now = parseInt((await counter.textContent())?.trim() || '0', 10) || 0;
      expect(now).toBeGreaterThan(before);
    }).toPass({ timeout: 5_000 });
  });

  test('добавление в избранное меняет иконку и счётчик', async ({ page }) => {
    const heart = page.locator(favorites.heartBtn).first();
    await expect(heart).toBeVisible();
    await heart.click();

    await expect(heart).toHaveClass(favorites.heartActiveClass);

    const counter = page.locator(favorites.counter).first();
    await expect(async () => {
      const val = parseInt((await counter.textContent())?.trim() || '0', 10) || 0;
      expect(val).toBeGreaterThan(0);
    }).toPass({ timeout: 5_000 });
  });

  test('данные корзины сохраняются после reload (cookie)', async ({ page }) => {
    const addBtn = page.locator(cart.addBtn).first();
    await expect(addBtn).toBeVisible();
    await addBtn.click();

    const counter = page.locator(cart.counter).first();
    await expect(async () => {
      const val = parseInt((await counter.textContent())?.trim() || '0', 10) || 0;
      expect(val).toBeGreaterThan(0);
    }).toPass({ timeout: 5_000 });

    const beforeReload = (await counter.textContent())?.trim() || '';

    await page.reload();
    await expect(page.locator(cart.counter).first()).toHaveText(beforeReload);

    const cookies = await page.context().cookies();
    expect(cookies.length).toBeGreaterThan(0);
  });
});
