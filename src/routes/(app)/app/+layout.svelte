<script lang="ts">
  import LanguageManager from '$lib/app/LanguageManager.svelte'
  import LanguageSwitcher from '$lib/LanguageSwitcher.svelte'
  import { theme } from '@jill64/npm-demo-layout'

  let { children } = $props()
</script>

<LanguageManager />
{@render children()}
