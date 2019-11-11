import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { content as en } from '../content/content.en'
import { content as de } from '../content/content.de'

export function useContent() {
  const content = { de, en }
  const [appState] = useContext(AppContext)
  return content[appState.language]
}
