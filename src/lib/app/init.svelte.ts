import { browser } from '$app/environment'
import { apply } from '@jill64/svelte-html'
import { storage } from '@jill64/svelte-storage'
import { enums } from '@jill64/svelte-storage/serde'
import type { Handle } from '@sveltejs/kit'
import { bakery } from 'svelte-baked-cookie'
import { store } from './store.svelte.js'
import type { Options } from './types/Options.js'
import { determine } from './util/determine'

export const init = <Locale extends string>(options: Options<Locale>) => {
  const {
    locales,
    defaultLocale = locales[0],
    cookieKey = 'svelte-i18n'
  } = options

  const settingSerde = enums<Locale | 'sync'>(locales, defaultLocale)

  let localStorage = storage({ 'svelte-i18n': settingSerde })

  const cookieBakery = (key = 'svelte-i18n') =>
    bakery({
      [key]: settingSerde
    })

  let localSetting = $state<Locale | 'sync'>(localStorage['svelte-i18n'])

  let locale = $derived(
    determine({
      acceptLanguages: store.acceptLanguages,
      navigators: store.navigators,
      setting: localSetting,
      locales,
      defaultLocale
    })
  )

  store.locale = localSetting

  const pick =
    (locale: Locale) =>
    <T>(dictionary: Record<Locale, T>) =>
      dictionary[locale]

  let translate = $derived(pick(locale))

  const attach: Handle = ({ event, resolve }) => {
    const { request, cookies } = event

    const isPageRequest = request.headers.get('Accept')?.includes('text/html')

    if (!isPageRequest) {
      return resolve(event)
    }

    const { bakedCookies } = cookieBakery(cookieKey).bake(cookies)
    const settingVal = bakedCookies[cookieKey]

    const languages = request.headers.get('Accept-Language')

    localSetting = settingVal

    store.acceptLanguages = languages

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
    get locale() {
      return locale
    },
    get translate() {
      return translate
    },
    get attach() {
      return attach
    },
    get setting() {
      return localSetting
    },
    set setting(value) {
      localStorage['svelte-i18n'] = value
      localSetting = value
      if (browser) {
        cookieBakery(cookieKey).rebake()[cookieKey] = value
      }
    }
  }
}
