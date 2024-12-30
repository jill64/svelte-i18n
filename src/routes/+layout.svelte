<script lang="ts">
  import { page } from '$app/state'
  import { Layout } from '@jill64/npm-demo-layout'
  import { TabItems } from 'svelte-page-tab'
  import README from '../../README.md?raw'
  import packageJson from '../../package.json'
  import { i } from '../i18n'

  let { children } = $props()
</script>

<Layout {packageJson} {README}>
  <ul class="language-tab">
    <TabItems
      routes={new Map([
        ['/', 'Top'],
        [
          page.route.id?.includes('[locale=locale]') ? i.altered('en') : '/en',
          'English'
        ],
        [
          page.route.id?.includes('[locale=locale]') ? i.altered('ja') : '/ja',
          '日本語'
        ],
        ['/app', 'App Mode']
      ])}
    />
  </ul>
  <main>
    {@render children()}
  </main>
</Layout>

<style>
  :global(ul) {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }
  :global(ul li) {
    margin: 0;
    padding: 0;
    display: contents;
  }
  :global(ul a) {
    color: gray;
    text-decoration: none;
    padding: 1rem;
    margin-bottom: 1px;
    border-bottom: 1px solid gray;
  }
  :global(ul a[data-current-location]) {
    color: inherit;
  }
  :global(ul a[data-current-location]) {
    margin-bottom: none;
    border-bottom: 2px solid rebeccapurple;
  }
  :global(ul li a):hover {
    background: rgba(0, 0, 0, 0.1);
  }
  :global(ul li a):active {
    background: rgba(0, 0, 0, 0.1);
  }
  :global(.dark ul li a):hover {
    background: rgba(255, 255, 255, 0.1);
  }
  :global(.dark ul li a):active {
    background: rgba(255, 255, 255, 0.2);
  }
</style>
