<script lang="ts">
  import { Menu } from '@jill64/svelte-menu'
  import type { Snippet } from 'svelte'
  import { slide } from 'svelte/transition'
  import TranslateIcon from '../TranslateIcon.svelte'
  import { store } from './store.svelte'

  let {
    style = '',
    Class = '',
    width = 24,
    stroke = '#000',
    strokeWidth = 2,
    iconClass = '',
    menuClass = '',
    liClass = '',
    defaultLabel = '',
    children
  }: {
    style?: string
    Class?: string
    width?: number
    stroke?: string
    strokeWidth?: number
    iconClass?: string
    menuClass?: string
    liClass?: string
    defaultLabel?: string
    children?: Snippet<[string]>
  } = $props()
</script>

<Menu
  style="position:relative; display: inline-flex;"
  summaryStyle="display: inline-flex;"
>
  {#snippet button()}
    <button {style} class={Class}>
      <TranslateIcon {width} {strokeWidth} {stroke} class={iconClass} />
    </button>
  {/snippet}
  {#snippet contents()}
    <ul class={menuClass} transition:slide>
      {#each store.locales as locale}
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <li
          class={liClass}
          onclick={() => {
            store.setting(locale)
          }}
        >
          {#snippet fallback(label: string)}
            {label}
          {/snippet}
          {@render (children ?? fallback)(locale)}
        </li>
      {/each}
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <li
        onclick={() => {
          store.setting('sync')
        }}
      >
        {defaultLabel ||
          store.translate({
            en: 'Default',
            ja: 'デフォルト'
          })}
      </li>
    </ul>
  {/snippet}
</Menu>

<style>
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    border-radius: 9999rem;
    padding: 0.5rem;
  }
  button:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  button:active {
    background: rgba(0, 0, 0, 0.2);
  }
  :global(.dark) button:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  :global(.dark) button:active {
    background: rgba(255, 255, 255, 0.2);
  }
</style>
