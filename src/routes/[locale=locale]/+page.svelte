<script lang="ts">
  import { locale } from '../../i18n'
</script>

<h3>
  {#if $locale === 'en'}
    Index Page
  {:else}
    インデックスページ
  {/if}
</h3>
