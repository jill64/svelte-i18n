<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { LocaleAlternates } from '$lib'
  import { translate } from '../i18n'
</script>

<LocaleAlternates />
<header>
  <a href={base}><h1>svelte-i18n</h1></a>
  <a href="https://github.com/jill64/svelte-i18n">GitHub</a>
</header>
<main>
  <span>{$page.url.href}</span>
  <h2>
    {$translate({
      en: 'Current Language',
      ja: '現在の言語'
    })} : {$translate({
      en: 'English',
      ja: '日本語'
    })}
  </h2>
  <slot />
</main>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  :global(body) {
    margin: 0;
    font-family: sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: #222;
      color: #eee;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
