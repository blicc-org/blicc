import { useEffect } from 'react'
import { useApiEndpoint } from './useApiEndpoint'
import { API } from '../../config'
import { useDeliveryEndpoint } from './useDeliveryEndpoint'
import { useContext } from 'react'
import { SettingsContext } from '../context'

export function usePublisher() {
  const [settings] = useContext(SettingsContext)
  const [publish, , state] = useDeliveryEndpoint()
  const [, access] = useApiEndpoint()

  function retrieveIds() {
    const set = {}
    Object.keys(settings).map(key => {
      const value = settings[key]['data_source']
      set[value] = value
    })
    return Object.keys(set).map(key => key)
  }

  useEffect(() => {
    const ids = retrieveIds()
    if (state === WebSocket.OPEN && ids.length > 0) {
      ids.map(async id => {
        const [status, data] = await access({
          url: `${API.ORIGIN}/data-sources/${id}`,
        })
        if (status === 200) {
          console.log('publish', id)
          await publish(`/data-delivery/${id}`, data.data)
        }
      })
    }
    // eslint-disable-next-line
  }, [settings])
}
