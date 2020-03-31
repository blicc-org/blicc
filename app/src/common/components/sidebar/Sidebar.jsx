import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Layout, PieChart, Database, ChevronsLeft } from 'react-feather'
import { AppContext, SidebarContext } from '../../context'
import { sidebarWidth } from '../../../config'
import { useMobile, useInstalled, useLanguage, useClickAway } from '../../hooks'
import { Footer } from '../footer/Footer'
import './Sidebar.scss'

function SidebarHeader({ name }) {
  return (
    <h6 className="sidebar-heading d-flex align-items-center p-3 my-0 text-muted">
      <span>{name}</span>
    </h6>
  )
}

export function Sidebar({ open }) {
  const content = useLanguage()
  const [appState] = useContext(AppContext)
  const { loggedIn } = appState
  const [, setSidebarState] = useContext(SidebarContext)
  const [sidebarStyle, setSidebarStyle] = useState({})
  const [blackoutStyle, setBlackoutStyle] = useState({})
  const isMobile = useMobile()
  const isInstalled = useInstalled()
  const ref = useRef()
  useClickAway(ref, () => close(), 'prevent-sidebar-click-away')

  function close() {
    if (open && isMobile) {
      setSidebarState((prev) => {
        return { ...prev, open: false }
      })
    }
  }

  useEffect(() => {
    setSidebarStyle({
      width: sidebarWidth,
      left: open ? 0 : -sidebarWidth,
    })
    setBlackoutStyle({
      width: open && isMobile ? '100%' : 0,
    })
  }, [open, isMobile])
  return (
    <>
      <nav className="sidebar" style={sidebarStyle} ref={ref}>
        {!(isInstalled && isMobile) && (
          <>
            {loggedIn ? (
              <>
                <SidebarHeader name={content.categories} />
                <ul className="nav flex-column px-2">
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboards" onClick={close}>
                      <Layout className="feather" /> {content.dashboards.title}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/charts" onClick={close}>
                      <PieChart className="feather" /> {content.charts.title}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/data-sources"
                      onClick={close}
                    >
                      <Database className="feather" />{' '}
                      {content.dataSources.title}
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="nav flex-column px-3 pt-4">
                  <li className="nav-item">
                    <p className="text-muted">
                      <Link to="/register" onClick={close}>
                        {content.sidebar.registerNow}
                      </Link>
                      {` ${content.sidebar.registerNowFollowUp}`}
                    </p>
                  </li>
                </ul>
              </>
            )}
            <hr className="mx-3" />
          </>
        )}
        <Footer close={close} />
        {isInstalled && isMobile && open && (
          <div className="sidebar-close-native" style={{ width: sidebarWidth }}>
            <a
              onClick={(evt) => {
                evt.preventDefault()
                close()
              }}
              href="/"
            >
              <p className="text-muted float-right">
                Close Sidebar
                <ChevronsLeft size={24} className="feather" />
              </p>
            </a>
          </div>
        )}
      </nav>
      <div className="blackout" style={blackoutStyle}></div>
    </>
  )
}
