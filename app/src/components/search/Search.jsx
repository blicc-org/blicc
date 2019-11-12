import React from 'react'
import { Search as SearchIcon } from 'react-feather'
import './Search.scss'

export function Search() {
  return (
    <form className="form-inline input-group search w-100 pr-5">
      <input
        className="form-control"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <div className="input-group-append">
        <button className="btn" type="submit">
          <SearchIcon className="search-icon" />
        </button>
      </div>
    </form>
  )
}
