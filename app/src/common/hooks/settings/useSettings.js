import { useContext } from 'react'
import { SettingsContext } from '../../context'

export function useSettings(id) {
  const [settings, setSettings] = useContext(SettingsContext)

  function set(key, value) {
    setSettings(prev => {
      if (!prev[id]) prev[id] = {}
      prev[id][key] = value
      return prev
    })
  }

  function get(key) {
    return settings[id] && settings[id][key] ? settings[id][key] : ''
  }

  return [set, get]
}
