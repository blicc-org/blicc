import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search as SearchIcon, ArrowLeft } from 'react-feather'
import { useMobile } from '../../hooks/useMobile'
import { SearchInputField } from './SearchInputField'
import theme from '../../Theme.scss'
import './Search.scss'

export function Search() {
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()
  return (
    <>
      {open && (
        <form className="search-mobile form-inline input-group w-100">
          <div className="input-group-prepend">
            <button
              className="btn"
              onClick={event => {
                event.preventDefault()
                setOpen(false)
              }}
            >
              <ArrowLeft />
            </button>
          </div>
          <SearchInputField />
        </form>
      )}
      {isMobile ? (
        <>
          <Link
            to="/"
            className="nav-link ml-auto"
            style={{ cursor: 'pointer' }}
            onClick={event => {
              event.preventDefault()
              setOpen(true)
            }}
          >
            <SearchIcon style={{ color: theme.lightgray }} />
          </Link>
        </>
      ) : (
        <form className="form-inline input-group w-100 pr-5">
          <SearchInputField skin={'gray'} />
        </form>
      )}
    </>
  )
}
