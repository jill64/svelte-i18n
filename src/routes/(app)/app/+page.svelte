<script lang="ts">
  import { i } from '../../../i18nApp'

  const changeToJP = () => {
    i.setting = 'ja'
  }

  const changeToEN = () => {
    i.setting = 'en'
  }

  const changeToSync = () => {
    i.setting = 'sync'
  }

  $inspect({
    setting: i.setting,
    locale: i.locale,
    translate_result: i.translate({ en: 'Hello World', ja: 'こんにちは、世界' })
  })
</script>

<p>i.locale = {i.locale}</p>
<p>i.setting = {i.setting}</p>
<p>
  {i.translate({
    en: 'Hello World',
    ja: 'こんにちは、世界'
  })}
</p>
<div>
  <button onclick={changeToEN}> Change to English </button>
  <button onclick={changeToJP}> Change to Japanese </button>
  <button onclick={changeToSync}> Change to Sync </button>
</div>
