<script lang="ts">
  import { TabItems } from 'svelte-page-tab'
  import { i } from '../../../i18n'
</script>

<ul>
  <TabItems
    routes={new Map([
      [
        `/${i.locale}`,
        i.translate({
          en: 'Index',
          ja: 'インデックス'
        })
      ],
      [`/${i.locale}/1`, '1'],
      [`/${i.locale}/2`, '2'],
      [`/${i.locale}/3`, '3'],
      [`/${i.locale}/4`, '4']
    ])}
  />
</ul>
<slot />
