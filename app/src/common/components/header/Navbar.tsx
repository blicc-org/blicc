import React, { useContext, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context'
import { useLanguage, useInstalled, useMobile } from '../../hooks'
import { ReactComponent as Burger } from '../../../assets/img/Burger.svg'
import { ReactComponent as Logo } from '../../../assets/img/Logo.svg'
import { NavbarUser } from './NavbarUser'
import { Search } from '../search/Search'
import { sidebarWidth } from '../../../config'
import './Navbar.scss'

export function NavBar({ toggleMenu }: any) {
  const content = useLanguage()
  const isInstalled = useInstalled()
  const isMobile = useMobile()
  const [appState] = useContext(AppContext)
  const { id, firstName, lastName, loggedIn } = appState
  const [width, setWidth] = useState(window.innerWidth)

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const style = {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    fontSize: '1rem',
  }

  return (
    <>
      <nav
        className="navbar navbar-expand fixed-top navbar-dark bg-dark p-0"
        style={{ width }}
      >
        <div
          className="navbar-nav"
          style={{ width: `${sidebarWidth}px`, flexShrink: 0 }}
        >
          {isInstalled && isMobile ? (
            <div className="pl-3"></div>
          ) : (
            <div className="nav-item">
              <div
                title="Toggle Sidebar"
                className="menu-button nav-link pl-4 pr-3 py-2 prevent-sidebar-click-away"
                style={{ marginBottom: '2px' }}
                onClick={toggleMenu}
              >
                <Burger className="burger" />
              </div>
            </div>
          )}
          <div className="nav-item">
            <Link className="navbar-brand p-1" style={style} to="/">
              <Logo className="logo" />
              <div className="title">{content.brand} </div>
            </Link>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <Search />
        </div>
        <div className="navbar-nav ml-auto pr-3">
          <NavbarUser
            id={id}
            firstName={firstName}
            lastName={lastName}
            loggedIn={loggedIn}
          />
        </div>
      </nav>
    </>
  )
}
