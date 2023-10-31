<script lang="ts">
  import { base } from '$app/paths'
  import { altered, locale } from '../../i18n'
</script>

<div>
  <a href={$altered('en')}> English </a>
  <a href={$altered('ja')}> 日本語 </a>
</div>
<div>
  <a href="{base}/{$locale}/1">1</a>
  <a href="{base}/{$locale}/2">2</a>
  <a href="{base}/{$locale}/3">3</a>
  <a href="{base}/{$locale}/4">4</a>
</div>
<slot />

<style>
  a {
    color: rgb(55, 65, 174);
    text-decoration: none;
  }
  @media (prefers-color-scheme: dark) {
    a {
      color: rgb(129, 137, 227);
    }
  }
  a:hover {
    text-decoration: underline;
  }
  div {
    display: flex;
    font-size: x-large;
    gap: 1rem;
    align-items: center;
    padding: 0 1rem;
  }
</style>
