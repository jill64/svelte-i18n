<script lang="ts">
  import { store } from './store'

  export let xDefaultHref: string | undefined = undefined

  $: ({ locale, locales, altered, defaultLocale } = $store)

  $: href = xDefaultHref || $altered(defaultLocale)
</script>

<svelte:head>
  {#each locales.filter((x) => x !== $locale) as lang}
    {@const href = $altered(lang)}
    {#if href}
      <link rel="alternate" hreflang={lang} {href} />
    {/if}
  {/each}
  {#if href}
    <link rel="alternate" hreflang="x-default" {href} />
  {/if}
</svelte:head>
