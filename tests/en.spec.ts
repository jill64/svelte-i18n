import { expect, test } from '@playwright/test'

test('en', async ({ page }) => {
  await page.goto('/en')

  await expect(
    page.getByRole('heading', { name: 'Current Language : English' })
  ).toBeVisible()

  await page.getByRole('link', { name: '日本語' }).click()

  await expect(
    page.getByRole('heading', { name: '現在の言語 : 日本語' })
  ).toBeVisible()

  const page2Link = page.getByRole('link', { name: '2', exact: true })

  await expect(page2Link).toBeVisible()
  await page2Link.click()
  await expect(page.getByText('ページ-2')).toBeVisible()
})
