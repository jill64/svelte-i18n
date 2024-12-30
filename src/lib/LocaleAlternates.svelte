<script lang="ts">
  import { store } from './store.svelte'

  let { xDefaultHref = undefined }: { xDefaultHref?: string } = $props()

  let href = $derived(xDefaultHref || store.altered(store.defaultLocale))
</script>

<svelte:head>
  {#each store.locales.filter((x) => x !== store.locale) as lang}
    {@const href = store.altered(lang)}
    {#if href}
      <link rel="alternate" hreflang={lang} {href} />
    {/if}
  {/each}
  {#if href}
    <link rel="alternate" hreflang="x-default" {href} />
  {/if}
</svelte:head>
