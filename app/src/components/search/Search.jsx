import React from 'react'
import { Search as SearchIcon } from 'react-feather'
import './Search.scss'

export function Search() {
  return (
    <form className="form-inline search">
      <div className="input-group ">
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="input-group-append">
          <button className="btn btn-light" type="submit">
            <SearchIcon className="search-icon" />
          </button>
        </div>
      </div>
    </form>
  )
}
