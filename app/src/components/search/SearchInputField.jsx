import React, { useState } from 'react'
import { Search as SearchIcon } from 'react-feather'
import theme from '../../Theme.scss'
import './SearchInputField.scss'

export function SearchInputField({ skin = 'light' }) {
  const [backgroundColor, setGgColor] = useState(getDefault())

  function getDefault() {
    return skin === 'light' ? theme.light : theme.gray
  }

  return (
    <>
      <input
        className="form-control search-input"
        type="search"
        placeholder="Search"
        aria-label="Search"
        style={{ backgroundColor }}
        onFocus={() => setGgColor(theme.light)}
        onBlur={() => setGgColor(getDefault())}
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
    </>
  )
}
