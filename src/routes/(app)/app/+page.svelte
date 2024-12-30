<script lang="ts">
  import { i } from '../../../i18nApp'

  const changeToJP = () => {
    i.setting = 'ja'
  }

  const changeToEN = () => {
    i.setting = 'en'
  }
</script>

<p>i.locale = {i.locale}</p>
<p>
  {i.translate({
    en: 'Hello World',
    ja: 'こんにちは、世界'
  })}
</p>
<div>
  <button onclick={changeToEN}> Change to English </button>
  <button onclick={changeToJP}> Change to Japanese </button>
</div>
