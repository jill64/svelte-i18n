<!----- BEGIN GHOST DOCS HEADER ----->

# svelte-i18n

[![npm-version](https://img.shields.io/npm/v/@jill64/svelte-i18n)](https://npmjs.com/package/@jill64/svelte-i18n) [![npm-license](https://img.shields.io/npm/l/@jill64/svelte-i18n)](https://npmjs.com/package/@jill64/svelte-i18n) [![npm-download-month](https://img.shields.io/npm/dm/@jill64/svelte-i18n)](https://npmjs.com/package/@jill64/svelte-i18n) [![npm-min-size](https://img.shields.io/bundlephobia/min/@jill64/svelte-i18n)](https://npmjs.com/package/@jill64/svelte-i18n) [![ci.yml](https://github.com/jill64/svelte-i18n/actions/workflows/ci.yml/badge.svg)](https://github.com/jill64/svelte-i18n/actions/workflows/ci.yml) [![deploy.yml](https://github.com/jill64/svelte-i18n/actions/workflows/deploy.yml/badge.svg)](https://github.com/jill64/svelte-i18n/actions/workflows/deploy.yml)

🌍 i18n toolkit for SvelteKit

<!----- END GHOST DOCS HEADER ----->

## Install

```sh
npm i @jill64/svelte-i18n
```

## Example

### Setup

```js
// src/lib/i18n.js
import { init } from '@jill64/svelte-i18n'

const { match, locale, translate } = init({
  locales: ['en', 'ja'],
  slug: '[locale=locale]',
  defaultLocale: 'en'
})
```

## Directory

```
src
|
|-- params
|   |
|   |-- locale.js
|
|-- routes
    |
    |-- [locale=locale]
        |
        |-- +page.svelte
```

## Usage

```js
// src/params/locale.js
export { match } from '$lib/i18n'
```

```svelte
<!-- src/routes/[locale=locale]/+page.svelte -->
<script>
  import { translate, locale } from '$lib/i18n'

  // src/routes/en => 'en'
  // src/routes/ja => 'ja'
  // src/routes/invalid-param => 'en' (defaultLocale)
  console.log($locale)
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
