import { test, expect } from '@playwright/test';
import {
  banner,
  header,
  search,
  cart,
  favorites,
  sorting,
  product,
  chat,
} from '../page-objects/selectors';

// ================================================================
// TC-01 · БАННЕР · ветка: feat/tc-01-banner
// ================================================================
test.describe('TC-01 Баннер', () => {
  // TODO: участник TC-01 пишет свои тесты здесь
});

// ================================================================
// TC-02 · ШАПКА САЙТА · ветка: feat/tc-02-header
// ================================================================
test.describe('TC-02 Шапка сайта', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('верхнее меню: пункты кликабельны', async ({ page }) => {
    for (const name of ['О нас', 'Доставка', 'Контакты']) {
      const link = page.locator(header.topMenuLink(name)).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', /.+/);
    }
  });

  test('телефон использует tel:', async ({ page }) => {
    const phone = page.locator(header.phone).first();
    await expect(phone).toHaveAttribute('href', /^tel:/);
  });

  test('соцсети ведут на корректные ресурсы', async ({ page }) => {
    const expected: Record<string, RegExp> = {
      VK: /vk\.com/,
      YouTube: /youtube\.com/,
      Telegram: /t\.me|telegram/,
    };
    for (const [name, pattern] of Object.entries(expected)) {
      const link = page.locator(header.social(name as any)).first();
      await expect(link).toHaveAttribute('href', pattern);
    }
  });
});

// ================================================================
// TC-03 · ПОИСК · ветка: feat/tc-03-search
// ================================================================
test.describe('TC-03 Поиск', () => {
  // TODO: участник TC-03 пишет свои тесты здесь
});

// ================================================================
// TC-04 · КОРЗИНА И ИЗБРАННОЕ · ветка: feat/tc-04-cart
// ================================================================
test.describe('TC-04 Корзина и избранное', () => {
  // TODO: участник TC-04 пишет свои тесты здесь
});

// ================================================================
// TC-05 · СОРТИРОВКА · ветка: feat/tc-05-sorting
// ================================================================
test.describe('TC-05 Сортировка', () => {
  // TODO: участник TC-05 пишет свои тесты здесь
});

// ================================================================
// TC-06 · КАРТОЧКА ТОВАРА · ветка: feat/tc-06-product
// ================================================================
test.describe('TC-06 Карточка товара', () => {
  // TODO: участник TC-06 пишет свои тесты здесь
});

// ================================================================
// TC-07 · ВИДЖЕТ ЧАТА · ветка: feat/tc-07-chat
// ================================================================
test.describe('TC-07 Виджет чата', () => {
  // TODO: участник TC-07 пишет свои тесты здесь
});
