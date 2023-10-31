<script lang="ts">
  import { store } from './store'

  export let xDefaultHref: string | undefined = undefined

  $: ({ locale, locales, altered, defaultLocale } = $store)
</script>

<svelte:head>
  {#each locales.filter((x) => x !== $locale) as lang}
    <link rel="alternate" hreflang={lang} href={$altered(lang)} />
  {/each}
  <link
    rel="alternate"
    hreflang="x-default"
    href={xDefaultHref ?? $altered(defaultLocale)}
  />
</svelte:head>
