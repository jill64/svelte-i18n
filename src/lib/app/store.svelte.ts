let acceptLanguages = $state<string | null>(null)
let locale = $state<string | undefined>(undefined)
let navigators = $state<readonly string[]>([])
let locales = $state<string[]>([])
let translate = $state<(_: Record<string, string>) => string>(({}) => '')
let setting = $state<(locale: string) => unknown>(() => {})

export const store = {
  get acceptLanguages() {
    return acceptLanguages
  },
  set acceptLanguages(value) {
    acceptLanguages = value
  },
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
  get navigators() {
    return navigators
  },
  set navigators(value) {
    navigators = value
  },
  set translate(value) {
    translate = value
  },
  get translate() {
    return translate
  },
  get setting() {
    return setting
  },
  set setting(value) {
    setting = value
  }
}
