<script lang="ts">
  import { Menu } from '@jill64/svelte-menu'
  import type { Snippet } from 'svelte'
  import { slide } from 'svelte/transition'
  import { store } from './store.svelte'
  import TranslateIcon from './TranslateIcon.svelte'

  let {
    style = '',
    Class = '',
    width = 24,
    stroke = '#000',
    strokeWidth = 2,
    iconClass = '',
    menuClass = '',
    aClass = '',
    iconStyle = '',
    menuStyle = '',
    aStyle = '',
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
    aClass?: string
    iconStyle?: string
    menuStyle?: string
    liStyle?: string
    aStyle?: string
    children?: Snippet<[string]>
  } = $props()
</script>

<Menu
  style="position:relative; display: inline-flex;"
  summaryStyle="display: inline-flex;"
>
  {#snippet button()}
    <button {style} class={Class}>
      <TranslateIcon
        {width}
        {strokeWidth}
        {stroke}
        class={iconClass}
        style={iconStyle}
      />
    </button>
  {/snippet}
  {#snippet contents()}
    <div class={menuClass} style={menuStyle} transition:slide>
      {#each store.locales as locale (locale)}
        <a class={aClass} href={store.altered(locale)} style={aStyle}>
          {#snippet fallback(label: string)}
            {label}
          {/snippet}
          {@render (children ?? fallback)(locale)}
        </a>
      {/each}
    </div>
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
