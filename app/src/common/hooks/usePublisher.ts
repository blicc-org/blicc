import { useApiEndpoint } from './useApiEndpoint'
import { API } from '../../config'
import { useDeliveryEndpoint } from './useDeliveryEndpoint'
import { useContext } from 'react'
import { SettingsContext } from '../context'

export function usePublisher(): Array<Function> {
  const [settings] = useContext(SettingsContext)
  const [publish] = useDeliveryEndpoint()
  const [, access] = useApiEndpoint()
  const interval = 5000 // live time update interval

  function retrieveIds(): any {
    const set = []
    for (const key of Object.keys(settings)) {
      const value = settings[key]['data_source']
      if (value) set[value] = value
    }
    return Object.keys(set).map((key) => key)
  }

  async function publishAll(): Promise<void> {
    const ids = retrieveIds()
    if (ids.length > 0) {
      ids.map(
        async (id: string): Promise<void> => {
          const [status, data] = await access({
            url: `${API.ORIGIN}/data-sources/${id}`,
          })
          if (status === 200) {
            await publish(`/data-sources/${id}`)
          }
        }
      )
    }
  }

  async function publishById(id: string): Promise<void> {
    const [status, data] = await access({
      url: `${API.ORIGIN}/data-sources/${id}`,
    })
    if (status === 200) {
      await publish(`/data-sources/${id}`)
    }
  }

  return [publishAll, publishById]
}
