import React, { useContext } from 'react'
import { AppContext } from '../../context'
import { languages } from '../../../config'
import './LanguageSelect.scss'

export function LanguageSelect() {
  const [appState, setAppState] = useContext(AppContext)

  function onChange(event) {
    setAppState({ ...appState, language: event.target.value })
  }

  return (
    <select
      label="Select a language"
      className="form-control form-control-sm language-select"
      onChange={onChange}
      value={appState.language}
    >
      {Object.keys(languages).map((key, index) => {
        return (
          <option key={index} value={key}>
            {languages[key]} - {key.toUpperCase()}
          </option>
        )
      })}
    </select>
  )
}
