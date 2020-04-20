import React, { useContext, ReactElement } from 'react'
import { AppContext } from '../../context'
import { languages } from '../../../config'
import './LanguageSelect.scss'

export function LanguageSelect(): ReactElement {
  const [appState, setAppState] = useContext(AppContext)

  function onChange(event: any): void {
    setAppState({ ...appState, language: event.target.value })
  }

  return (
    <select
      className="form-control form-control-sm language-select"
      onChange={onChange}
      value={appState.language}
    >
      {Object.keys(languages).map(
        (key, index): ReactElement => {
          return (
            <option key={index} value={key}>
              {languages[key]} - {key.toUpperCase()}
            </option>
          )
        }
      )}
    </select>
  )
}
