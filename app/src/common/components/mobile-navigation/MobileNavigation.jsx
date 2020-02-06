import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Layout, PieChart, Database } from 'react-feather'
import { useMobile } from '../../hooks'
import './MobileNavigation.scss'

export function MobileNavigation() {
  const isMobile = useMobile()
  const getRatio = () => window.innerHeight / window.innerWidth
  const [isProperHeight, setIsProperHeight] = useState(getRatio() > 1)

  useEffect(() => {
    function handleResize() {
      setIsProperHeight(getRatio() > 1)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {isMobile && isProperHeight && (
        <>
          <div className="mobile-navigation">
            <ul className="nav flex-row justify-content-around py-1">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboards">
                  <Layout className="feather" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/charts">
                  <PieChart className="feather" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/data-sources">
                  <Database className="feather" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="bumber" />
        </>
      )}
    </>
  )
}
