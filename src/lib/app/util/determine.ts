import acceptLanguage from 'accept-language'

export const determine = (params: {
  acceptLanguages: string | null
  navigators: readonly string[]
  setting: string
  locales: string[]
  defaultLocale: string | undefined
}): string => {
  const { acceptLanguages, navigators, locales, defaultLocale, setting } =
    params

  if (setting !== 'sync') {
    return setting
  }

  if (acceptLanguages) {
    const parser = acceptLanguage.create()
    parser.languages(locales)
    const language = parser.get(acceptLanguages)

    if (language) {
      return language
    }
  }

  if (navigators.length) {
    const parser = acceptLanguage.create()
    parser.languages(locales)
    const language = parser.get(navigators.join(', '))

    if (language) {
      return language
    }
  }

  return defaultLocale ?? locales[0]
}
