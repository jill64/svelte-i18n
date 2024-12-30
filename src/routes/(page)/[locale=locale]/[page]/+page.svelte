<script lang="ts">
  import { page } from '$app/state'
  import { i } from '../../../../i18n'
</script>

<h3>
  {i.translate({ en: 'Page', ja: 'ページ' })}-{page.params.page}
</h3>
