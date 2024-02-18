import { apply } from '@jill64/svelte-html'
import type { Handle } from '@sveltejs/kit'
import { derived } from 'svelte/store'
import { acceptLanguages } from './store/acceptLanguages'
import { navigators } from './store/navigators'
import { setting } from './store/setting'
import type { Options } from './types/Options.js'
import { determine } from './util/determine'

export const init = <Locale extends string>(options: Options<Locale>) => {
  const {
    locales,
    defaultLocale = locales[0],
    cookieKey = 'svelte-i18n'
  } = options

  const locale = derived(
    [acceptLanguages, navigators, setting],
    ([$acceptLanguages, $navigators, $setting]) =>
      determine({
        acceptLanguages: $acceptLanguages,
        navigators: $navigators,
        setting: $setting,
        locales: options.locales,
        defaultLocale: options.defaultLocale
      })
  )

  const pick =
    (locale: Locale) =>
    <T>(dictionary: Record<Locale, T>) =>
      dictionary[locale]

  const translate = derived(locale, ($locale) =>
    pick(
      (locales as string[]).includes($locale)
        ? ($locale as Locale)
        : defaultLocale
    )
  )

  const attach: Handle = ({ event, resolve }) => {
    const { request, cookies } = event

    const isPageRequest = request.headers.get('Accept')?.includes('text/html')

    if (!isPageRequest) {
      return resolve(event)
    }

    const settingVal = cookies.get(cookieKey) ?? 'sync'

    const languages = request.headers.get('Accept-Language')

    setting.set(settingVal)
    acceptLanguages.set(languages)

    const lang = determine({
      acceptLanguages: languages,
      navigators: [],
      setting: settingVal,
      locales,
      defaultLocale
    })

    return resolve(event, {
      transformPageChunk: apply({
        lang
      })
    })
  }

  return {
    locale,
    translate,
    attach
  }
}
