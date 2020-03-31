import { useApiEndpoint } from './useApiEndpoint'
import { API } from '../../config'
import { useDeliveryEndpoint } from './useDeliveryEndpoint'
import { useContext } from 'react'
import { SettingsContext } from '../context'

export function usePublisher() {
  const [settings] = useContext(SettingsContext)
  const [publish] = useDeliveryEndpoint()
  const [, access] = useApiEndpoint()
  const interval = 5000 // live time update interval

  function retrieveIds() {
    const set = {}
    for (var key of Object.keys(settings)) {
      const value = settings[key]['data_source']
      if (value) set[value] = value
    }
    return Object.keys(set).map((key) => key)
  }

  async function publishAll() {
    const ids = retrieveIds()
    if (ids.length > 0) {
      ids.map(async (id) => {
        const [status, data] = await access({
          url: `${API.ORIGIN}/data-sources/${id}`,
        })
        if (status === 200) {
          await publish(`/data-delivery/${id}`, {
            ...data.data,
            interval,
          })
        }
      })
    }
  }

  async function publishById(id) {
    const [status, data] = await access({
      url: `${API.ORIGIN}/data-sources/${id}`,
    })
    if (status === 200) {
      await publish(`/data-delivery/${id}`, { ...data.data, interval })
    }
  }

  return [publishAll, publishById]
}
