// i18n.js
import { init } from '@jill64/svelte-i18n'

// { match, altered, locale, translate, attach }
export const i = init({
  locales: ['en', 'ja'],
  slug: '[locale=locale]',
  defaultLocale: 'en'
})
