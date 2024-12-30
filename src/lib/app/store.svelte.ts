import { browser } from '$app/environment'

let acceptLanguages = $state<string | null>(null)
let locale = $state<string | undefined>(undefined)
let navigators = $state<readonly string[]>([])

if (browser) {
  navigators = navigator.languages
  addEventListener('languagechange', () => {
    navigators = navigator.languages
  })
}

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
  get navigators() {
    return navigators
  }
}
