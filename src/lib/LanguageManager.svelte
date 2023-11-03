<script lang="ts">
  import { SvelteHTML } from '@jill64/svelte-html'
  import { store } from './store'

  $: ({ locale } = $store)
</script>

<SvelteHTML lang={$locale} />
