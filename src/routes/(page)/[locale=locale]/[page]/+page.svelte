<script lang="ts">
  import { page } from '$app/stores'
  import { translate } from '../../../../i18n'
</script>

<h3>
  {$translate({ en: 'Page', ja: 'ページ' })}-{$page.params.page}
</h3>
