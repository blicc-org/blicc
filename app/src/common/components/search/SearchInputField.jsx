import React, { useState, useEffect, useRef } from 'react'
import statusCode from 'http-status-codes'
import { Search as SearchIcon, ArrowLeft } from 'react-feather'
import { useClose, useApiEndpoint } from '../../hooks'
import { Result } from './Result'
import theme from '../../../Theme.scss'
import './SearchInputField.scss'

const INIT_DATA = {
  total: 0,
  dashboards: [],
}

export function SearchInputField({ isFullscreen = false, close = () => {} }) {
  const [, access, ,] = useApiEndpoint('/dashboards')
  const [backgroundColor, setGgColor] = useState(getDefault())
  const [searchTerm, setSearchTerm] = useState('')
  const [focused, setFocused] = useState(false)
  const [data, setData] = useState(INIT_DATA)
  const ref = useRef()
  useClose(ref, () => handleClose(false))

  function handleClose() {
    setFocused(false)
    setGgColor(getDefault())
    setSearchTerm('')
    close()
  }

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access({
        params: { fields: 'id,title', search: searchTerm, take: 10 },
      })
      if (status === statusCode.OK) {
        setData(data)
      }
    }

    if (searchTerm === '') {
      setData(INIT_DATA)
    } else {
      fetchData()
    }
    // eslint-disable-next-line
  }, [searchTerm])

  function getDefault() {
    return isFullscreen ? theme.light : theme.gray
  }

  function onFocus() {
    setFocused(true)
    setGgColor(theme.light)
  }

  return (
    <>
      <form
        ref={ref}
        className={`form-inline input-group w-100 ${
          isFullscreen ? 'search-mobile' : ''
        }`}
        onFocus={onFocus}
      >
        {isFullscreen && (
          <div className="input-group-prepend">
            <button
              className="btn"
              onClick={event => {
                event.preventDefault()
                close()
              }}
            >
              <ArrowLeft />
            </button>
          </div>
        )}
        <input
          className="form-control search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ backgroundColor }}
          onChange={event => setSearchTerm(event.target.value)}
          value={searchTerm}
        />
        <div className="input-group-append">
          <button
            className="btn search-button"
            type="submit"
            onClick={event => event.preventDefault()}
            style={{ backgroundColor }}
          >
            <SearchIcon />
          </button>
        </div>
        <Result show={focused} results={data.dashboards} total={data.total} />
      </form>
    </>
  )
}
