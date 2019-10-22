import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Home, File, ShoppingCart, Heart } from 'react-feather'
import { SidebarContext } from '../../context/SidebarContext'
import { sidebarWidth } from '../../config/gui'
import { useDimensions } from '../../hooks/useDimensions'
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
  const [, setSidebarState] = useContext(SidebarContext)
  const [sidebarStyle, setSidebarStyle] = useState({})
  const [blackoutStyle, setBlackoutStyle] = useState({})
  const isMobile = useDimensions()

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
        <SidebarHeader name="Dashboards" />
        <ul className="nav flex-column px-2">
          <li className="nav-item">
            <Link className="nav-link active" to="/dashboards" onClick={close}>
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
      </div>
      <div className="blackout" onClick={close} style={blackoutStyle}></div>
    </>
  )
}
