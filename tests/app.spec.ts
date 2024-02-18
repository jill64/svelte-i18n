import { expect, test } from '@playwright/test'

test('app', async ({ page }) => {
  await page.goto('/app')

  const lang = await page.locator('html').getAttribute('lang')
  expect(lang).toBe('en')

  await expect(page.getByText('$locale = en')).toBeVisible()
  await expect(page.getByText('Hello World')).toBeVisible()

  await page.getByRole('button', { name: 'Japanese' }).click()

  await expect(page.getByText('$locale = ja')).toBeVisible()
  await expect(page.getByText('こんにちは、世界')).toBeVisible()

  const lang2 = await page.locator('html').getAttribute('lang')
  expect(lang2).toBe('ja')

  await page.reload()

  await expect(page.getByText('$locale = ja')).toBeVisible()
  await expect(page.getByText('こんにちは、世界')).toBeVisible()

  const lang3 = await page.locator('html').getAttribute('lang')
  expect(lang3).toBe('ja')
})
