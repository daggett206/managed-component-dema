import { MCEvent } from '@managed-components/types'
import { DemaPayload } from './types'

export const track = async (event: MCEvent, payload: DemaPayload) => {
  console.log('Run track', event, payload)

  const url = new URL('https://tracker.dema.ai/track.js')

  for (const [key, value] of Object.entries(payload)) {
    url.searchParams.set(key, value)
  }

  // console.log('Track: ' + url.toString())

  // let's use API that works 100% just for testing
  console.log('Track:', 'jsonplaceholder')

  // return fetch(url.toString(), {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(response => {
      console.log('--> Here is the response we wont see', response)
      return response
    })
}
