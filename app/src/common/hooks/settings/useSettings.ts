import { useContext } from 'react'
import { SettingsContext } from '../../context'

export function useSettings(): Array<any> {
  const [settings, setSettings] = useContext(SettingsContext)

  function insert(id: string, key: string, value: any): any {
    setSettings((prev: any) => {
      if (!prev[id]) prev[id] = {}
      prev[id][key] = value
      return prev
    })
  }

  function remove(id: string): any {
    setSettings((prev: any) => {
      if (prev[id]) delete prev[id]
      return prev
    })
  }

  function access(id: string, key: string): any {
    if (!settings[id]) settings[id] = {}
    if (!settings[id][key]) settings[id][key] = ''
    return settings[id][key]
  }

  return [access, insert, remove]
}
