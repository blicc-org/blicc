import { useContext } from 'react'
import { AppContext } from '../context'
import en from '../../languages/en'
import de from '../../languages/de'

export function useLanguage(): any {
  const [appState] = useContext(AppContext)
  const content: any = { de, en }
  let selected = en
  if (appState && appState.language) selected = content[appState.language]
  return selected
}
