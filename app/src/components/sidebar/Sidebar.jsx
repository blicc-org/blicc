import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Home, File, ShoppingCart, PlusCircle, FileText } from 'react-feather'
import { SidebarContext } from '../../context/SidebarContext'
import { sidebarWidth } from '../../config/gui'
import { useDimensions } from '../../hooks/useDimensions'
import './Sidebar.scss'

export function Sidebar({ open }) {
  const [, setSidebarState] = useContext(SidebarContext)
  const [sidebarStyle, setSidebarStyle] = useState({})
  const [blackoutStyle, setBlackoutStyle] = useState({})
  const isMobile = useDimensions()

  function closeOnClick() {
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
            <Link
              className="nav-link active"
              to="/dashboards"
              onClick={closeOnClick}
            >
              <Home className="feather" /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={closeOnClick}>
              <File className="feather" /> Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={closeOnClick}>
              <ShoppingCart className="feather" /> Products
            </Link>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Saved reports</span>
          <Link className="text-muted pl-3" to="/" onClick={closeOnClick}>
            <PlusCircle className="feather" />
          </Link>
        </h6>
        <ul className="nav flex-column mb-2 px-2 py-3">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={closeOnClick}>
              <FileText className="feather" /> Current month
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={closeOnClick}>
              <FileText className="feather" /> Last quarter
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="blackout"
        onClick={closeOnClick}
        style={blackoutStyle}
      ></div>
    </>
  )
}
