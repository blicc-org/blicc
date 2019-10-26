import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'
import { Home, File, ShoppingCart, Heart } from 'react-feather'
import { SidebarContext } from '../../context/SidebarContext'
import { sidebarWidth } from '../../config/gui'
import { useMobile } from '../../hooks/useMobile'
import { Selector, CHART_TYPE } from '../dashboard/Selector'
import './Sidebar.scss'

function SidebarHeader({ name }) {
  return (
    <h6 className="sidebar-heading d-flex align-items-center p-3 my-0 text-muted">
      <span>{name}</span>
    </h6>
  )
}

export function Sidebar({ open }) {
  const [appState] = useContext(AppContext)
  const { loggedIn } = appState
  const [, setSidebarState] = useContext(SidebarContext)
  const [sidebarStyle, setSidebarStyle] = useState({})
  const [blackoutStyle, setBlackoutStyle] = useState({})
  const isMobile = useMobile()

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

  return (
    <>
      <div className="sidebar" style={sidebarStyle}>
        {loggedIn ? (
          <>
            <SidebarHeader name="Dashboards" />
            <ul className="nav flex-column px-2">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/dashboards"
                  onClick={close}
                >
                  <Home className="feather" /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/test" onClick={close}>
                  <Heart className="feather" /> Test
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={close}>
                  <File className="feather" /> Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={close}>
                  <ShoppingCart className="feather" /> Products
                </Link>
              </li>
            </ul>
            <SidebarHeader name="Charts" />
            <ul className="nav flex-column px-2">
              <li className="nav-item">
                <Selector id={CHART_TYPE.lineChart} onDragStart={close} />
              </li>
              <li className="nav-item">
                <Selector id={CHART_TYPE.barChart} onDragStart={close} />
              </li>
              <li className="nav-item">
                <Selector id={CHART_TYPE.pieChart} onDragStart={close} />
              </li>
            </ul>
            <SidebarHeader name="Data" />
          </>
        ) : (
          <>
            <ul className="nav flex-column px-2 pt-4">
              <li className="nav-item">
                <p className="text-muted">
                  <Link to="/register">Register now</Link>
                  {`  to start designing and analysing your data.`}
                </p>
              </li>
            </ul>
          </>
        )}
      </div>
      <div
        className="blackout"
        onTouchStart={close}
        onClick={close}
        style={blackoutStyle}
      ></div>
    </>
  )
}
