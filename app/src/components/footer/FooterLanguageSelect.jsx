import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { languages } from '../../config'

export function FooterLanguageSelect() {
  const [appState, setAppState] = useContext(AppContext)

  function onChange(event) {
    setAppState({ ...appState, language: event.target.value })
  }

  return (
    <div className="m-3">
      <select
        className="form-control form-control-sm"
        onChange={onChange}
        value={appState.language}
      >
        {languages.map(lg => {
          return (
            <option key={lg} value={lg}>
              {lg}
            </option>
          )
        })}
      </select>
    </div>
  )
}
