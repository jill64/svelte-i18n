<script lang="ts">
  import { SvelteHTML } from '@jill64/svelte-html'
  import { locale } from './store/locale'
</script>

<SvelteHTML lang={$locale} />
