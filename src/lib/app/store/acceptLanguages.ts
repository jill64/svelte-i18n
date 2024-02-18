import { writable } from 'svelte/store'

export const acceptLanguages = writable<string | null>(null)
