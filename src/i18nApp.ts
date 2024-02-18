import { init } from './lib/app/index'

export const { translate, locale, attach, setting } = init({
  locales: ['en', 'ja'],
  defaultLocale: 'en'
})
