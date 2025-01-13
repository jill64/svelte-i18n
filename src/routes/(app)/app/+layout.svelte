<script lang="ts">
  import LanguageManager from '$lib/app/LanguageManager.svelte'

  let { children } = $props()
</script>

<LanguageManager />
{@render children()}
