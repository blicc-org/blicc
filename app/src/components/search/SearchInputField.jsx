import React, { useState } from 'react'
import { Search as SearchIcon } from 'react-feather'
import { Result } from './Result'
import theme from '../../Theme.scss'
import './SearchInputField.scss'

export function SearchInputField({ skin = 'light' }) {
  const [backgroundColor, setGgColor] = useState(getDefault())
  const [searchTerm, setSearchTerm] = useState('')
  const [focused, setFocused] = useState(false)

  const dashboards = [
    // {
    //   name: 'Umsatz 2018',
    //   description: 'Hier siehst du die Umstätze von 2018.',
    //   id: '34280',
    // },
    // {
    //   name: 'Umsatz 2018',
    //   description: 'Hier siehst du die Umstätze von 2018.',
    //   id: '231213',
    // },
  ]

  function getDefault() {
    return skin === 'light' ? theme.light : theme.gray
  }

  function onFocus() {
    setFocused(true)
    setGgColor(theme.light)
  }

  function onBlur() {
    setFocused(false)
    setGgColor(getDefault())
  }

  return (
    <>
      <input
        className="form-control search-input"
        type="search"
        placeholder="Search"
        aria-label="Search"
        style={{ backgroundColor }}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <div className="input-group-append">
        <button
          className="btn search-button"
          type="submit"
          style={{ backgroundColor }}
        >
          <SearchIcon />
        </button>
      </div>
      <Result show={focused} results={dashboards} />
    </>
  )
}
