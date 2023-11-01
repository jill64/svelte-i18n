import { expect, test } from '@playwright/test'

test('ja', async ({ page }) => {
  await page.goto('/ja')

  const lang = await page.locator('html').getAttribute('lang')
  expect(lang).toBe('ja')

  await expect(
    page.getByRole('heading', { name: '現在の言語 : 日本語' })
  ).toBeVisible()

  await page.getByRole('link', { name: 'English' }).click()

  await expect(
    page.getByRole('heading', { name: 'Current Language : English' })
  ).toBeVisible()

  const page1Link = page.getByRole('link', { name: '1', exact: true })

  await expect(page1Link).toBeVisible()
  await page1Link.click()
  await expect(page.getByText('Page-1')).toBeVisible()
})
