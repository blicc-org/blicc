import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  Home,
  File,
  ShoppingCart,
  PlusCircle,
  FileText,
  Heart,
} from 'react-feather'
import { SidebarContext } from '../../context/SidebarContext'
import { sidebarWidth } from '../../config/gui'
import { useDimensions } from '../../hooks/useDimensions'
import { Selector, CHART_TYPE } from '../dashboard/Selector'
import './Sidebar.scss'

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
        <ul className="nav flex-column px-2 pt-3">
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
        <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <Link className="text-muted pl-3" to="/" onClick={close}>
            <PlusCircle className="feather" />
          </Link>
        </h6>
        <ul className="nav flex-column mb-2 px-2 py-3">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={close}>
              <FileText className="feather" /> Current month
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={close}>
              <FileText className="feather" /> Last quarter
            </Link>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Charts</span>
        </h6>
        <ul className="nav flex-column mb-2 px-2 py-3">
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
      </div>
      <div className="blackout" onClick={close} style={blackoutStyle}></div>
    </>
  )
}
