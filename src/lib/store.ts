import { readable, writable, type Readable } from 'svelte/store'

export const store = writable({
  locale: readable('') as Readable<string>,
  locales: [] as string[],
  altered: readable(() => '') as Readable<(locale?: string) => string>,
  defaultLocale: ''
})
