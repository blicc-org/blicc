import React from 'react'
import { Link } from 'react-router-dom'
import {
  useLanguage,
  useDeliveryEndpoint,
  useInstalled,
} from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { ReactComponent as Logo } from '../../assets/img/Logo.svg'
import { ReactComponent as Android } from '../../assets/img/Android.svg'
import { ANDROID_APP_STORE_LINK } from '../../config'
import './LandingPage.scss'

export function LandingPage() {
  const installed = useInstalled()
  const content = useLanguage()
  const title = 'Blicc'
  const description = 'Visualize your data with customizable dashboards.'
  const path = '/'

  // close websocket connection on logged out
  useDeliveryEndpoint()

  return (
    <>
      <MetaData title={title} description={description} path={path} />
      <div className="col-md-5 mx-auto py-5 my-5 text-center">
        <Logo height="100px" alt="logo" />
        <h1 className="display-4 font-weight-normal">{content.title}</h1>
        <p className="lead font-weight-normal">{content.description}</p>
        <Link className="btn btn-outline-primary" to="/dashboards">
          {content.getStarted}
        </Link>
        {installed && (
          <>
            <br />
            <a
              className="btn btn-outline-success android-button mt-3"
              href={ANDROID_APP_STORE_LINK}
            >
              Install Android App{' '}
              <Android className="android" alt="Android App" />
            </a>
          </>
        )}
      </div>
    </>
  )
}
