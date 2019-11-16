import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { en } from '../../languages/en'
import { de } from '../../languages/de'

export function useLanguage() {
  const content = { de, en }
  const [appState] = useContext(AppContext)
  return content[appState.language]
}
