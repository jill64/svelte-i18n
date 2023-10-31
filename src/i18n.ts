import { init } from '$lib'

export const { match, altered, locale, translate } = init({
  locales: ['en', 'ja'],
  slug: '[locale=locale]',
  defaultLocale: 'en'
})
