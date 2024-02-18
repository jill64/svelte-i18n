<script lang="ts">
  import { locale, setting, translate } from '../../../i18nApp'

  const changeToJP = () => {
    $setting = 'ja'
  }

  const changeToEN = () => {
    $setting = 'en'
  }
</script>

<p>$locale = {$locale}</p>
<p>
  {$translate({
    en: 'Hello World',
    ja: 'こんにちは、世界'
  })}
</p>
<div>
  <button on:click={changeToEN}> Change to English </button>
  <button on:click={changeToJP}> Change to Japanese </button>
</div>
