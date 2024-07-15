import acceptLanguage from 'accept-language'

export const determine = <Locale extends string>(params: {
  acceptLanguages: string | null
  navigators: readonly string[]
  setting: Locale | 'sync'
  locales: Locale[]
  defaultLocale: Locale | undefined
}): Locale => {
  const { acceptLanguages, navigators, locales, defaultLocale, setting } =
    params

  const isLocale = (str: string): str is Locale =>
    locales.includes(str as Locale)

  const convert = (str: string): Locale =>
    isLocale(str) ? str : (defaultLocale ?? locales[0])

  if (setting !== 'sync') {
    return convert(setting)
  }

  if (acceptLanguages) {
    const parser = acceptLanguage.create()
    parser.languages(locales)
    const language = parser.get(acceptLanguages)

    if (language) {
      return convert(language)
    }
  }

  if (navigators.length) {
    const parser = acceptLanguage.create()
    parser.languages(locales)
    const language = parser.get(navigators.join(', '))

    if (language) {
      return convert(language)
    }
  }

  return defaultLocale ?? locales[0]
}
