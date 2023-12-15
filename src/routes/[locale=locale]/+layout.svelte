<script lang="ts">
  import { TabItems } from 'svelte-page-tab'
  import { locale, translate } from '../../i18n'
</script>

<ul>
  <TabItems
    routes={new Map([
      [
        `/${$locale}`,
        $translate({
          en: 'Index',
          ja: 'インデックス'
        })
      ],
      [`/${$locale}/1`, '1'],
      [`/${$locale}/2`, '2'],
      [`/${$locale}/3`, '3'],
      [`/${$locale}/4`, '4']
    ])}
  />
</ul>
<slot />
