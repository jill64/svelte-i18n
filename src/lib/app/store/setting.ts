import { storage } from '@jill64/svelte-storage'
import { string } from '@jill64/svelte-storage/serde'
import { writable } from 'svelte/store'

const local = storage('svelte-i18n', string)

const { subscribe, set } = writable<string | 'sync'>('sync')

local.subscribe(set)

export const setting = {
  subscribe,
  set: (value: string | 'sync') => {
    local.set(value)
    set(value)
  }
}
