export type Options<Locale extends string> = {
  /**
   * An array of locales.
   * @example ['en', 'es', 'fr']
   */
  locales: Locale[]

  /**
   * The default locale.
   * @example 'en'
   * @default locales[0]
   */
  defaultLocale?: Locale

  /**
   * The cookie key.
   * @default 'svelte-i18n'
   */
  cookieKey?: string
}
