export type Options<Locale extends string> = {
  slug: `[${string}]` | `[${string}=${string}]`
  locales: Locale[]
  defaultLocale?: Locale
}
