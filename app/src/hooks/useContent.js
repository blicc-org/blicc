import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import en from '../content/content.en'
import de from '../content/content.de'

export function useContent() {
  const content = { de, en }
  const [appState] = useContext(AppContext)
  return content[appState.language]
}
