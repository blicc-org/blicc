import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Layout, PieChart, Database, ChevronsRight } from 'react-feather'
import { useMobile, useInstalled, useLanguage } from '../../hooks'
import { SidebarContext } from '../../context'
import './NativeNavigation.scss'

export function NativeNavigation() {
  const content = useLanguage()
  const minHeightForMobileNav = 450
  const isMobile = useMobile()
  const isInstalled = useInstalled()
  const isProperHeight = () => window.innerHeight > minHeightForMobileNav
  const [show, setShow] = useState(isProperHeight())
  const [sidebarState, setSidebarState] = useContext(SidebarContext)
  const { open } = sidebarState
  const toggle = (evt: any) => {
    evt.preventDefault()
    setSidebarState((prev: any) => ({ ...prev, open: !open }))
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
              <a className="nav-link" onClick={toggle} href="/">
                <ChevronsRight className="feather" />
                <p>
                  <small>{content.sidebar.title}</small>
                </p>
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboards">
                <Layout className="feather" />
                <p>
                  <small>{content.dashboards.title}</small>
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/charts">
                <PieChart className="feather" />
                <p>
                  <small>{content.charts.title}</small>
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/data-sources">
                <Database className="feather" />
                <p>
                  <small>{content.dataSources.title}</small>
                </p>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
