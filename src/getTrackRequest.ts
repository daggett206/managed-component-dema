import { DemaPayload } from './types'

export const prepareUrl = (payload: DemaPayload): URL => {
  const url = new URL('https://tracker.dema.ai/track.js')

  for (const [key, value] of Object.entries(payload)) {
    url.searchParams.set(key, value)
  }

  return url
}

export const getTrackRequest = async (
  payload: DemaPayload
): Promise<Request> => {
  return new Request(prepareUrl(payload).toString(), {
    headers: {
      'User-Agent': payload.ua ?? '',
    },
  })
}
