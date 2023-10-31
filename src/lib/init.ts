import { base } from '$app/paths'
import { page } from '$app/stores'
import type { Page } from '@sveltejs/kit'
import { derived, type Readable } from 'svelte/store'
import { store } from './store.js'
import type { Options } from './types/Options.js'

const baseDepth = base.match(/\//g)?.length ?? 0

export const init = <Locale extends string>(options: Options<Locale>) => {
  const { locales, slug, defaultLocale = locales[0] } = options

  const key = slug.slice(1, slug.includes('=') ? slug.indexOf('=') : -1)

  const match = (value: string): value is Locale =>
    (locales as string[]).includes(value)

  /**
   * Locale obtained from the specified slug.
   * If you are in an invalid locale, fallback to default locale.
   */
  const locale = derived(page, ({ params: { [key]: param } }) =>
    match(param) ? param : defaultLocale
  )

  /**
   * Creates a string that replaces the current url with the specified locale.
   * If no locale is specified, a locale parameter is created with the locale parameter removed.
   */
  const altered = derived<Readable<Page>, (locale?: Locale) => string>(
    page,
    ({ route: { id: route_id }, url: { search, pathname, hash } }) => {
      const replaceIndex = route_id
        ? route_id.split('/').indexOf(slug) + baseDepth
        : null

      const pathArray = pathname.split('/')

      return (locale?: string) => {
        if (!replaceIndex) {
          return ''
        }

        const path = [
          ...pathArray.slice(0, replaceIndex),
          ...(locale ? [locale] : []),
          ...pathArray.slice(replaceIndex + 1)
        ].join('/')

        return `${origin}/${path}${search}${hash}`
      }
    }
  )

  store.set({
    locale,
    locales,
    altered: altered as Readable<(locale?: string) => string>,
    defaultLocale
  })

  const pick =
    (locale: Locale) =>
    <T>(dictionary: Record<Locale, T>) =>
      dictionary[locale]

  /**
   * Translate the specified dictionary in the current locale.
   */
  const translate = derived(locale, pick)

  return {
    locale,
    translate,
    altered,
    match
  }
}
