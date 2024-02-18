export type Options<Locale extends string> = {
  /**
   * The slug to be used to change the locale.
   * @example '[locale]'
   */
  slug: `[${string}]` | `[${string}=${string}]`

  /**
   * An array of locales.
   * @example ['en', 'es', 'fr']
   */
  locales: Locale[]

  /**
   * The default locale.
   * @example 'en'
   */
  defaultLocale?: Locale
}
