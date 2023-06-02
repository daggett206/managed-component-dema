import { MCEvent } from '@managed-components/types'
import { DemaPayload } from './types'

export const track = async (event: MCEvent, payload: DemaPayload) => {
  const url = new URL('https://tracker.dema.ai/track.js')

  for (const [key, value] of Object.entries(payload)) {
    url.searchParams.set(key, value)
  }

  return fetch(url.toString(), {
    headers: {
      'User-Agent': event.client.userAgent,
    },
  })
}
