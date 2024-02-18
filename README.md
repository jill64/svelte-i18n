<!----- BEGIN GHOST DOCS HEADER ----->

# svelte-i18n

<!----- BEGIN GHOST DOCS BADGES -----><a href="https://npmjs.com/package/@jill64/svelte-i18n"><img src="https://img.shields.io/npm/v/@jill64/svelte-i18n" alt="npm-version" /></a> <a href="https://npmjs.com/package/@jill64/svelte-i18n"><img src="https://img.shields.io/npm/l/@jill64/svelte-i18n" alt="npm-license" /></a> <a href="https://npmjs.com/package/@jill64/svelte-i18n"><img src="https://img.shields.io/npm/dm/@jill64/svelte-i18n" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/@jill64/svelte-i18n"><img src="https://img.shields.io/bundlephobia/min/@jill64/svelte-i18n" alt="npm-min-size" /></a> <a href="https://github.com/jill64/svelte-i18n/actions/workflows/ci.yml"><img src="https://github.com/jill64/svelte-i18n/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a> <a href="https://svelte-i18n.jill64.dev"><img src="https://img.shields.io/website?up_message=working&down_message=down&url=https%3A%2F%2Fsvelte-i18n.jill64.dev" alt="website" /></a><!----- END GHOST DOCS BADGES ----->

🌍 i18n toolkit for SvelteKit

## [Demo](https://svelte-i18n.jill64.dev)

<!----- END GHOST DOCS HEADER ----->

## Install

```sh
npm i @jill64/svelte-i18n
```

## Quick Example

Use a function to translate from the specified locales based on the current route parameters.

```js:src/lib/i18n.js
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

## Bind html lang attribute

Each time a locale change is detected on the client side, it is reflected in the `lang` attribute of the `html`

```svelte
<!-- src/routes/+layouts.svelte -->
<script>
  import { LanguageManager } from '@jill64/svelte-i18n'
</script>

<LanguageManager />
```

↓

```html
<!-- locale = 'en' | 'ja' -->
<html lang="{locale}">
  <!-- ... -->
</html>
```

## Attach html lang attribute

SSR uses the `attach` handler to add the lang attribute to html tags.

```js:src/lib/i18n.js
// src/lib/i18n.js
import { init } from '@jill64/svelte-i18n'

const { attach } = init({
  locales: ['en', 'ja'],
  defaultLocale: 'en'
})
```

```js:src/hooks.server.js
// src/hooks.server.js
import { attach as handle } from '$lib/i18n'
```

To use with any handle hook, use the `sequence` function.

```js:src/hooks.server.js
// src/hooks.server.js
import { attach } from '$lib/i18n'
import { sequence } from '@sveltejs/kit/hooks'

export const handle = sequence(attach, () => {
  // ... Your Handler Function
})
```

## Route param matcher

Use param matcher to add type checking for route parameters.

```js:src/lib/i18n.js
// src/lib/i18n.js
import { init } from '@jill64/svelte-i18n'

const { match } = init({
  locales: ['en', 'ja'],
  slug: '[locale=locale]',
  defaultLocale: 'en'
})
```

```js:src/params/locale.js
// src/params/locale.js
export { match } from '$lib/i18n'
```

## Switch Language

Quickly create links to different language versions of the current page.

```js:src/lib/i18n.js
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

## Locale Alternates

Create a link tag in the head element to another language based on the Locales to improve SEO.

```js:src/lib/i18n.js
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

```html
<link rel="alternate" hreflang="ja" href="/ja/foo/bar" />
<link
  rel="alternate"
  hreflang="x-default"
  href="default-language-href(optional)"
/>
```

## RTL

If RTL is required, a Svelte component can be created as follows

```svelte
<script>
  import { translate, locale } from '$lib/i18n'
</script>

<p dir={$locale === 'ar' ? 'rtl' : 'ltr'}>
  {$translate({
    en: 'English',
    ar: 'عربي'
  })}
</p>
```

## Web App Mode

Web applications may not want to include language as a parameter to keep URLs clean.
In app mode, language settings are stored using cookies and localStorage.

```js:src/lib/i18n.js
// src/lib/i18n.js
import { init } from '@jill64/svelte-i18n/app'

const { locale, translate, attach, setting } = init({
  locales: ['en', 'ja'],
  defaultLocale: 'en'
})
```

The following features are not available in this mode

- route based language switching
- route matcher
- `match`
- `altered`
- `LocaleAlternates`

## Set Locale

In app mode, language settings can be changed by setting values in the `$setting` store.

```svelte
<script>
  import { setting } from '$lib/i18n'

  const changeToJP = () => {
    $setting = 'ja'
  }
</script>

<button on:click={changeToJP}> Change to Japanese </button>
```
