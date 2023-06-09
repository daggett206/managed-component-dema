import { ComponentSettings, Manager } from '@managed-components/types'
import { track } from './track'
import { getOrderPayload, getPageviewPayload } from './payload'

export default function (manager: Manager, settings: ComponentSettings) {
  manager.addEventListener('pageview', async event => {
    console.log('Event pageview: ' + JSON.stringify(event))

    const res = await track(event, getPageviewPayload(event, settings))

    console.log(`--> and here is another log we wont see`, 123)

    console.log(
      `--> this track() wont be invoked, at least i didnt see the log inside the fn second time`
    )
    const res2 = await track(event, getPageviewPayload(event, settings))

    console.log(`--> no log for res2`, res2)

    return res
  })

  manager.addEventListener('ecommerce', async event => {
    console.log('Event ecommerce: ' + JSON.stringify(event))
    const action =
      event.name || event.payload.name || event.payload.ecommerce.name

    switch (action) {
      case 'Product Viewed': {
        const res = await track(event, getPageviewPayload(event, settings))
        console.log('res', res)
        return res
      }

      case 'Order Completed': {
        const res = await track(event, getOrderPayload(event, settings))
        console.log('res', res)
        return res
      }

      default: {
        console.log('Wrong action', action)
        return
      }
    }
  })
}
