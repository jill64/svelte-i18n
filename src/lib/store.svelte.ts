let locale = $state('')
let locales = $state<string[]>([])
let altered = $state<(locale?: string) => string>(() => '')
let defaultLocale = $state('')

export const store = {
  get locale() {
    return locale
  },
  set locale(value) {
    locale = value
  },
  get locales() {
    return locales
  },
  set locales(value) {
    locales = value
  },
  get altered() {
    return altered
  },
  set altered(value) {
    altered = value
  },
  get defaultLocale() {
    return defaultLocale
  },
  set defaultLocale(value) {
    defaultLocale = value
  }
}
