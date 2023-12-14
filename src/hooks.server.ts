import { attach } from './i18n'
import { init } from '@jill64/sentry-sveltekit-cloudflare/server'

const { onHandle, onError } = init(
  'https://574342583bad12b56fa1dbd4faa5305b@o4505814639312896.ingest.sentry.io/4506394548699136'
)

export const handle = onHandle(attach)
export const handleError = onError()
