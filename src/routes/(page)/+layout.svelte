<script lang="ts">
  import { page } from '$app/state'
  import { LanguageManager, LocaleAlternates } from '$lib'
  import LanguageSwitcher from '$lib/LanguageSwitcher.svelte'
  import { theme } from '@jill64/npm-demo-layout'
  import { i } from '../../i18n'
</script>

<LanguageManager />
<LocaleAlternates />
<LanguageSwitcher stroke={theme.isDark ? '#FFF' : '#000'} />
<p>{page.url.href}</p>
<p>
  {i.translate({
    en: 'Current Language : English',
    ja: '現在の言語 : 日本語'
  })}
  <code style:color="gray">($locale = {i.locale})</code>
</p>
<slot />

<style>
  :global(code) {
    font-size: large;
  }
  p {
    font-size: large;
  }
  :global(ul) {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }
  :global(ul li) {
    margin: 0;
    padding: 0;
    display: contents;
  }
  :global(ul a) {
    color: gray;
    text-decoration: none;
    padding: 1rem;
    margin-bottom: 1px;
    border-bottom: 1px solid gray;
  }
  :global(ul a[data-current-location]) {
    color: inherit;
  }
  :global(ul a[data-current-location]) {
    margin-bottom: none;
    border-bottom: 2px solid rebeccapurple;
  }
  :global(ul li a):hover {
    background: rgba(0, 0, 0, 0.1);
  }
  :global(ul li a):active {
    background: rgba(0, 0, 0, 0.1);
  }
  :global(.dark ul li a):hover {
    background: rgba(255, 255, 255, 0.1);
  }
  :global(.dark ul li a):active {
    background: rgba(255, 255, 255, 0.2);
  }
</style>
