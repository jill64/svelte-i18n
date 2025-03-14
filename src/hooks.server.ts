import { hooks } from '@jill64/npm-demo-layout'
import { init } from '@jill64/sentry-sveltekit-cloudflare/server'
import { sequence } from '@sveltejs/kit/hooks'
import { i } from './i18n'
import { i as iApp } from './i18nApp'

const { onHandle, onError } = init(
  'https://574342583bad12b56fa1dbd4faa5305b@o4505814639312896.ingest.sentry.io/4506394548699136'
)

export const handle = onHandle(
  sequence((arg) => {
    const {
      event: { route }
    } = arg

    if (route.id === '/(app)/app') {
      return iApp.attach(arg)
    }

    return i.attach(arg)
  }, hooks)
)

export const handleError = onError()
