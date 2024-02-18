import { browser } from '$app/environment'
import { apply } from '@jill64/svelte-html'
import { storage } from '@jill64/svelte-storage'
import { enums } from '@jill64/svelte-storage/serde'
import type { Handle } from '@sveltejs/kit'
import { bakery } from 'svelte-baked-cookie'
import { derived, writable } from 'svelte/store'
import { acceptLanguages } from './store/acceptLanguages'
import { navigators } from './store/navigators'
import type { Options } from './types/Options.js'
import { determine } from './util/determine'
import { locale as localeStore } from './store/locale'

export const init = <Locale extends string>(options: Options<Locale>) => {
  const {
    locales,
    defaultLocale = locales[0],
    cookieKey = 'svelte-i18n'
  } = options

  const settingSerde = enums<Locale | 'sync'>(locales, defaultLocale)

  const local = storage('svelte-i18n', settingSerde)

  const cookieBakery = (key = 'svelte-dark-theme') =>
    bakery({
      [key]: settingSerde
    })

  const { subscribe, set } = writable<Locale | 'sync'>('sync')

  local.subscribe(set)

  const setting = {
    subscribe,
    set: (value: Locale | 'sync') => {
      local.set(value)
      set(value)
      if (browser) {
        cookieBakery(cookieKey).rebake()[cookieKey].set(value)
      }
    }
  }

  const locale = derived(
    [acceptLanguages, setting, navigators],
    ([$acceptLanguages, $setting, $navigators]) =>
      determine({
        acceptLanguages: $acceptLanguages,
        navigators: $navigators,
        setting: $setting,
        locales,
        defaultLocale
      })
  )

  locale.subscribe(localeStore.set)

  const pick =
    (locale: Locale) =>
    <T>(dictionary: Record<Locale, T>) =>
      dictionary[locale]

  const translate = derived(locale, pick)

  const attach: Handle = ({ event, resolve }) => {
    const { request, cookies } = event

    const isPageRequest = request.headers.get('Accept')?.includes('text/html')

    if (!isPageRequest) {
      return resolve(event)
    }

    const { bakedCookies } = cookieBakery(cookieKey).bake(cookies)
    const settingVal = bakedCookies[cookieKey].get()

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
    attach,
    setting
  }
}
