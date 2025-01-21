<script lang="ts">
  import LanguageManager from '$lib/app/LanguageManager.svelte'
  import LanguageSwitcher from '$lib/app/LanguageSwitcher.svelte'
  import { theme } from '@jill64/npm-demo-layout'

  let { children } = $props()
</script>

<LanguageManager />
<LanguageSwitcher
  stroke={theme.isDark ? '#FFF' : '#000'}
  menuStyle="border-radius: 1rem; position: absolute; background: #AAA; z-index: 10; display: flex; flex-direction: column; padding: 1rem;"
  liStyle="padding: 1rem; color: #000; white-space: nowrap;"
/>
{@render children()}
