import { base } from '$app/paths'
import { page } from '$app/state'
import { apply } from '@jill64/svelte-html'
import type { Handle, Page } from '@sveltejs/kit'
import { store } from './store.svelte.js'
import type { Options } from './types/Options.js'

const baseDepth = base.match(/\//g)?.length ?? 0

export const init = <Locale extends string>(options: Options<Locale>) => {
  const { locales, slug, defaultLocale = locales[0] } = options

  const key = slug.slice(1, slug.includes('=') ? slug.indexOf('=') : -1)

  const match = (value: string): value is Locale =>
    (locales as string[]).includes(value)

  const getLocale = ({ [key]: param }: Partial<Page['params']>) =>
    param && match(param) ? param : defaultLocale

  store.locales = locales
  store.defaultLocale = defaultLocale

  const pick =
    (locale: Locale) =>
    <T>(dictionary: Record<Locale, T>) =>
      dictionary[locale]

  /**
   * Attach the current locale to the html.
   */
  let attach = (({ event, resolve }) =>
    resolve(event, {
      transformPageChunk: apply({
        lang: getLocale(event.params)
      })
    })) satisfies Handle

  /**
   * Creates a string that replaces the current url with the specified locale.
   * If no locale is specified, a locale parameter is created with the locale parameter removed.
   */
  let altered = (locale?: string) => {
    const {
      route: { id: route_id },
      url
    } = page

    const replaceIndex = route_id
      ? route_id
          .split('/')
          .filter((x) => !x.includes('('))
          .indexOf(slug) + baseDepth
      : -1

    const pathArray = url.pathname.split('/')

    if (replaceIndex === -1) {
      return ''
    }

    const path = [
      ...pathArray.slice(0, replaceIndex),
      ...(locale ? [locale] : []),
      ...pathArray.slice(replaceIndex + 1)
    ].join('/')

    const next = new URL(url)
    next.pathname = path

    return next.href
  }

  store.altered = altered

  return {
    get locale() {
      /**
       * Locale obtained from the specified slug.
       * If you are in an invalid locale, fallback to default locale.
       */
      const locale = getLocale(page.params)
      store.locale = locale
      return locale
    },
    get translate() {
      /**
       * Translate the specified dictionary in the current locale.
       */
      return pick(getLocale(page.params))
    },
    get altered() {
      return altered
    },
    get match() {
      return match
    },
    get attach() {
      return attach
    }
  }
}
