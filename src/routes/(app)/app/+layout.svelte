<script lang="ts">
  import LanguageManager from '$lib/app/LanguageManager.svelte'
  import LanguageSwitcher from '$lib/app/LanguageSwitcher.svelte'
  import { theme } from '@jill64/npm-demo-layout'

  let { children } = $props()
</script>

<LanguageManager />
<LanguageSwitcher stroke={theme.isDark ? '#FFF' : '#000'} />
{@render children()}
