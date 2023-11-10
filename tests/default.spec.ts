import { expect, test } from '@playwright/test'

test('default', async ({ page }) => {
  await page.goto('/')

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

  const page3Link = page.getByRole('link', { name: '3', exact: true })

  await expect(page3Link).toBeVisible()
  await page3Link.click()
  await expect(page.getByText('ページ-3')).toBeVisible()

  const prefix = await page.locator('html').getAttribute('prefix')
  expect(prefix).toBe('p_test')

  const suffix = await page.locator('html').getAttribute('suffix')
  expect(suffix).toBe('test_s')
})