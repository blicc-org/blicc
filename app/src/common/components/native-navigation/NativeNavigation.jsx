import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Layout, PieChart, Database, ChevronsRight } from 'react-feather'
import { useMobile, useInstalled } from '../../hooks'
import { SidebarContext } from '../../context'
import './NativeNavigation.scss'

export function NativeNavigation() {
  const minHeightForMobileNav = 450
  const isMobile = useMobile()
  const isInstalled = useInstalled()
  const isProperHeight = () => window.innerHeight > minHeightForMobileNav
  const [show, setShow] = useState(isProperHeight())
  const [sidebarState, setSidebarState] = useContext(SidebarContext)
  const { open } = sidebarState
  const toggle = evt => {
    evt.preventDefault()
    setSidebarState(prev => ({ ...prev, open: !open }))
  }

  useEffect(() => {
    function handleResize() {
      setShow(isProperHeight())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <>
      {isMobile && show && isInstalled && (
        <div className="mobile-navigation">
          <ul className="nav flex-row justify-content-around">
            <li className="nav-item">
              <a className="nav-link" onClick={toggle} href="#">
                <ChevronsRight className="feather" />
                <p>
                  <small>Sidebar</small>
                </p>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboards">
                <Layout className="feather" />
                <p>
                  <small>Dashboards</small>
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/charts">
                <PieChart className="feather" />
                <p>
                  <small>Charts</small>
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/data-sources">
                <Database className="feather" />
                <p>
                  <small>Data Sources</small>
                </p>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
