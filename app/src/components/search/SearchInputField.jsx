import React, { useState, useEffect } from 'react'
import statusCode from 'http-status-codes'
import { Search as SearchIcon, ArrowLeft } from 'react-feather'
import { Result } from './Result'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import theme from '../../Theme.scss'
import './SearchInputField.scss'

export function SearchInputField({ isFullscreen = false, onExit = () => {} }) {
  const [, access, ,] = useApiEndpoint('/dashboards')
  const [backgroundColor, setGgColor] = useState(getDefault())
  const [searchTerm, setSearchTerm] = useState('')
  const [focused, setFocused] = useState(false)
  const [dashboards, setDashboards] = useState([])

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access({
        params: { fields: 'id,title', search: searchTerm },
      })
      if (status === statusCode.OK) {
        setDashboards(data.dashboards)
      }
    }

    if (searchTerm === '') {
      setDashboards([])
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

  function onBlur() {
    setFocused(false)
    setGgColor(getDefault())
    setSearchTerm('')
  }

  return (
    <>
      <form
        className={`form-inline input-group w-100 ${
          isFullscreen ? 'search-mobile' : ''
        }`}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {isFullscreen && (
          <div className="input-group-prepend">
            <button
              className="btn"
              onClick={event => {
                event.preventDefault()
                onExit()
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
            style={{ backgroundColor }}
          >
            <SearchIcon />
          </button>
        </div>
        <Result show={focused} results={dashboards} />
      </form>
    </>
  )
}
