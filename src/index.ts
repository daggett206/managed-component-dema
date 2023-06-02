import { ComponentSettings, Manager } from '@managed-components/types'
import { track } from './track'
import { getOrderPayload, getPageviewPayload } from './payload'

export default async function (manager: Manager, settings: ComponentSettings) {
  manager.addEventListener('pageview', event => {
    return track(event, getPageviewPayload(event, settings))
  })

  manager.addEventListener('ecommerce', event => {
    const action =
      event.name || event.payload.name || event.payload.ecommerce.name

    switch (action) {
      case 'Product Viewed': {
        return track(event, getPageviewPayload(event, settings))
      }

      case 'Order Completed': {
        return track(event, getOrderPayload(event, settings))
      }

      default: {
        return
      }
    }
  })
}
