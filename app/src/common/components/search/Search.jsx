import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search as SearchIcon } from 'react-feather'
import { useMobile } from '../../hooks'
import { SearchInputField } from './SearchInputField'
import theme from '../../../Theme.scss'

export function Search() {
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()

  function close() {
    setOpen(false)
  }

  return (
    <>
      {open && <SearchInputField isFullscreen={true} close={close} />}
      {isMobile ? (
        <>
          <Link
            to="/"
            className="nav-link ml-auto"
            style={{ cursor: 'pointer' }}
            onClick={(event) => {
              event.preventDefault()
              setOpen(true)
            }}
          >
            <SearchIcon style={{ color: theme.lightgray }} />
          </Link>
        </>
      ) : (
        <div className=" w-100 pr-4">
          <SearchInputField close={close} />
        </div>
      )}
    </>
  )
}
