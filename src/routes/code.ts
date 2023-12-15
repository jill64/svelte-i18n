export const code = /* html */ `
<!-- +page.svelte -->
<script>
  import { translate } from 'i18n.js'
</script>

<h2>
  {$translate({
    en: 'Top Page',
    ja: 'トップページ'
  })}
</h2>
`
