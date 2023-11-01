<!----- BEGIN GHOST DOCS HEADER ----->

# svelte-i18n

[![npm-version](https://img.shields.io/npm/v/@jill64/svelte-i18n)](https://npmjs.com/package/@jill64/svelte-i18n) [![npm-license](https://img.shields.io/npm/l/@jill64/svelte-i18n)](https://npmjs.com/package/@jill64/svelte-i18n) [![npm-download-month](https://img.shields.io/npm/dm/@jill64/svelte-i18n)](https://npmjs.com/package/@jill64/svelte-i18n) [![npm-min-size](https://img.shields.io/bundlephobia/min/@jill64/svelte-i18n)](https://npmjs.com/package/@jill64/svelte-i18n) [![ci.yml](https://github.com/jill64/svelte-i18n/actions/workflows/ci.yml/badge.svg)](https://github.com/jill64/svelte-i18n/actions/workflows/ci.yml)

🌍 i18n toolkit for SvelteKit

<!----- END GHOST DOCS HEADER ----->

## [Demo + Example (StackBlitz)](https://stackblitz.com/edit/jill64-svelte-i18n?file=src%2Flib%2Fi18n.js)

## Install

```sh
npm i @jill64/svelte-i18n
```

## Quick Example

Use a function to translate from the specified locales based on the current route parameters.

```js
// src/lib/i18n.js
import { init } from '@jill64/svelte-i18n'

const { locale, translate } = init({
  locales: ['en', 'ja'],
  slug: '[locale]',
  defaultLocale: 'en'
})
```

```svelte
<!-- src/routes/[locale]/+page.svelte -->
<script>
  import { translate, locale } from '$lib/i18n'

  // src/routes/en => 'en'
  // src/routes/ja => 'ja'
  // src/routes/invalid-param => 'en' (defaultLocale)
  $: console.log($locale)
</script>

<h1>
  <!-- src/routes/en => English -->
  <!-- src/routes/ja => 日本語 -->
  {$translate({
    en: 'English',
    ja: '日本語'
  })}
</h1>
```

## Switch Language

Quickly create links to different language versions of the current page.

```js
// src/lib/i18n.js
import { init } from '@jill64/svelte-i18n'

const { altered } = init({
  locales: ['en', 'ja'],
  defaultLocale: 'en'
})
```

```svelte
<!-- src/routes/[locale](en)/foo/bar/+page.svelte -->
<script>
  import { altered } from '$lib/i18n'
</script>

<!-- href="/ja/foo/bar" -->
<a href={$altered('ja')}> Jump to Japanese Version </a>
```

## With param matcher example

Use param matcher to add type checking for route parameters.

```js
// src/lib/i18n.js
import { init } from '@jill64/svelte-i18n'

const { match } = init({
  locales: ['en', 'ja'],
  slug: '[locale=locale]',
  defaultLocale: 'en'
})
```

```js
// src/params/locale.js
export { match } from '$lib/i18n'
```

## Locale Alternates

Create a link tag in the head element to another language based on the Locales to improve SEO.

```js
// src/lib/i18n.js
import { init } from '@jill64/svelte-i18n'

const {
  /* ... */
} = init({
  locales: ['en', 'ja'],
  defaultLocale: 'en'
})
```

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { LocaleAlternates } from '@jill64/svelte-i18n'
</script>

<LocaleAlternates xDefaultHref="default-language-href(optional)" />
```

For example, if you are in `/[locale(en)]/foo/bar`, create the following tag in the `head` element

```svelte
<link rel="alternate" hreflang="ja" href="/ja/foo/bar" />
<link
  rel="alternate"
  hreflang="x-default"
  href="default-language-href(optional)"
/>
```
