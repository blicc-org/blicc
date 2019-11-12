import React, { useState } from 'react'
import { Search as SearchIcon, ArrowLeft } from 'react-feather'
import { useMobile } from '../../hooks/useMobile'
import theme from '../../Theme.scss'
import './Search.scss'

export function Search() {
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div className="mobile-search">
          <form className="form-inline input-group search w-100">
            <div className="input-group-prepend">
              <button className="btn" onClick={() => setOpen(false)}>
                <ArrowLeft />
              </button>
            </div>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn" type="submit">
                <SearchIcon />
              </button>
            </div>
          </form>
        </div>
      )}
      {isMobile ? (
        <a
          className="nav-link ml-auto"
          style={{ cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        >
          <SearchIcon style={{ color: theme.lightgray }} />
        </a>
      ) : (
        <form className="form-inline input-group search w-100 pr-5">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btn" type="submit">
              <SearchIcon />
            </button>
          </div>
        </form>
      )}
    </>
  )
}
