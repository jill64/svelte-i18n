import { writable } from 'svelte/store'

export const locale = writable<string | undefined>(undefined)
