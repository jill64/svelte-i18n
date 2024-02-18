import { browser } from '$app/environment'
import { readable } from 'svelte/store'

export const navigators = readable<readonly string[]>([], (set) => {
  if (browser) {
    set(navigator.languages)
    addEventListener('languagechange', () => set(navigator.languages))
  }
})
