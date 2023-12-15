// i18n.js
import { init } from '@jill64/svelte-i18n'

export const { match, altered, locale, translate, attach } = init({
  locales: ['en', 'ja'],
  slug: '[locale=locale]',
  defaultLocale: 'en'
})
