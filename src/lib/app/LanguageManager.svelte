<script lang="ts">
  import { SvelteHTML } from '@jill64/svelte-html'
  import { store } from './store.svelte'
</script>

<SvelteHTML lang={store.locale} />
