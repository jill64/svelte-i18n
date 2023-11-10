import { expect, test } from '@playwright/test'

test('en', async ({ page }) => {
  await page.goto('/en')

  const lang = await page.locator('html').getAttribute('lang')
  expect(lang).toBe('en')

  await expect(
    page.getByRole('heading', { name: 'Current Language : English' })
  ).toBeVisible()

  await page.getByRole('link', { name: '日本語' }).click()

  await expect(
    page.getByRole('heading', { name: '現在の言語 : 日本語' })
  ).toBeVisible()

  const lang2 = await page.locator('html').getAttribute('lang')
  expect(lang2).toBe('ja')

  const page2Link = page.getByRole('link', { name: '2', exact: true })

  await expect(page2Link).toBeVisible()
  await page2Link.click()
  await expect(page.getByText('ページ-2')).toBeVisible()

  const prefix = await page.locator('html').getAttribute('prefix')
  expect(prefix).toBe('p_test')

  const suffix = await page.locator('html').getAttribute('suffix')
  expect(suffix).toBe('test_s')
})