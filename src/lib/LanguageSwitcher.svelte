<script lang="ts">
  import { Menu } from '@jill64/svelte-menu'
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
    liClass = '',
    aClass = '',
    defaultLabel = ''
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
    defaultLabel?: string
  } = $props()
</script>

<Menu Class="relative">
  {#snippet button()}
    <button {style} class={Class}>
      <TranslateIcon {width} {strokeWidth} {stroke} class={iconClass} />
    </button>
  {/snippet}
  {#snippet contents()}
    <ul class={menuClass} transition:slide>
      {#each store.locales as locale}
        <li class={liClass}>
          <a class={aClass} href={store.altered(locale)}>{locale}</a>
        </li>
      {/each}
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
