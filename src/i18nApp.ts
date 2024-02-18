import { init } from './lib/app/index'

export const { translate, attach } = init({
  locales: ['en', 'ja'],
  defaultLocale: 'en'
})
