import { expect, test } from '@playwright/test'

test('default', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Current Language : English' })
  ).toBeVisible()

  await page.getByRole('link', { name: '日本語' }).click()

  await expect(
    page.getByRole('heading', { name: '現在の言語 : 日本語' })
  ).toBeVisible()

  const page3Link = page.getByRole('link', { name: '3', exact: true })

  await expect(page3Link).toBeVisible()
  await page3Link.click()
  await expect(page.getByText('ページ-3')).toBeVisible()
})
