<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { locale, translate } from '../../../i18n'
</script>

<h3>
  {$translate({ en: 'Page', ja: 'ページ' })}-{$page.params.page}
</h3>
<a href="{base}/{$locale}">
  {$translate({
    en: 'Return to Index',
    ja: 'インデックスに戻る'
  })}
</a>
