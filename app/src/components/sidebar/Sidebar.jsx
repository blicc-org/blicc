import React, { useState, useEffect, useContext, useRef } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { Home, File, ShoppingCart, Heart } from 'react-feather'
import { SidebarContext } from '../../context/SidebarContext'
import { sidebarWidth } from '../../config'
import { useMobile } from '../../hooks/useMobile'
import { Selector } from '../dashboard/Selector'
import { TYPE } from '../charts/Chart'
import { Footer } from '../footer/Footer'
import './Sidebar.scss'
import { useContent } from '../../hooks/useContent'
import { useClickAway } from '../../hooks/useClickAway'

function SidebarHeader({ name }) {
  return (
    <h6 className="sidebar-heading d-flex align-items-center p-3 my-0 text-muted">
      <span>{name}</span>
    </h6>
  )
}

export function Sidebar({ open }) {
  const content = useContent()
  const [appState] = useContext(AppContext)
  const { loggedIn } = appState
  const [, setSidebarState] = useContext(SidebarContext)
  const [sidebarStyle, setSidebarStyle] = useState({})
  const [blackoutStyle, setBlackoutStyle] = useState({})
  const isMobile = useMobile()
  const ref = useRef()

  function close() {
    if (open && isMobile) {
      setSidebarState(prev => {
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

  useClickAway(ref, () => close(), 'prevent-sidebar-click-away')
  return (
    <>
      <nav className="sidebar" style={sidebarStyle} ref={ref}>
        {loggedIn ? (
          <>
            <SidebarHeader name="Dashboards" />
            <ul className="nav flex-column px-2">
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboards">
                  <Home className="feather" /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/test">
                  <Heart className="feather trigger-close" /> Test
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <File className="feather" /> Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <ShoppingCart className="feather" /> Products
                </Link>
              </li>
            </ul>
            <SidebarHeader name="Charts" />
            <ul className="nav flex-column px-2">
              <li className="nav-item">
                <Selector type={TYPE.LINE_CHART} />
              </li>
              <li className="nav-item">
                <Selector type={TYPE.BAR_CHART} />
              </li>
              <li className="nav-item">
                <Selector type={TYPE.PIE_CHART} />
              </li>
            </ul>
            <SidebarHeader name="Data" />
            <ul className="nav flex-column px-2">
              <li className="nav-item">
                <Selector type={TYPE.LINE_CHART} />
              </li>
              <li className="nav-item">
                <Selector type={TYPE.BAR_CHART} />
              </li>
              <li className="nav-item">
                <Selector type={TYPE.PIE_CHART} />
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="nav flex-column px-3 pt-4">
              <li className="nav-item">
                <p className="text-muted">
                  <Link to="/register">{content.sidebar.registerNow}</Link>
                  {` ${content.sidebar.registerNowFollowUp}`}
                </p>
              </li>
            </ul>
          </>
        )}
        <hr className="mx-3" />
        <Footer />
      </nav>
      <div className="blackout" style={blackoutStyle}></div>
    </>
  )
}
