<script lang="ts">
  import { browser } from '$app/environment'
  import { store } from './store'

  $: ({ locale } = $store)

  $: if (browser) {
    document.getElementsByTagName('html')[0].setAttribute('lang', $locale)
  }
</script>
