<script lang="ts">
  import { Highlight, HighlightSvelte } from '@jill64/npm-demo-layout/highlight'
  import { javascript } from '@jill64/npm-demo-layout/highlight/languages'
  import { translate } from 'i18n.js'
  import i18nSource from '../i18n.ts?raw'
  import { code } from './code'
  import { hooksServerSource } from './hooksServerSource'
</script>

<div class="grid">
  <div style:overflow-x="auto">
    <h2>
      {$translate({
        en: 'Top Page',
        ja: 'トップページ'
      })}
    </h2>
    <HighlightSvelte {code} />
  </div>
  <div style:overflow-x="auto">
    <h3>Example Schema</h3>
    <Highlight code={i18nSource} language={javascript} />
    <h3>SSR Support</h3>
    <Highlight code={hooksServerSource} language={javascript} />
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1rem;
  }
  @media (max-width: 800px) {
    .grid {
      grid-template-columns: auto;
    }
  }
</style>
