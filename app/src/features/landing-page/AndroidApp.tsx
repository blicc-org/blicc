import React, { ReactElement } from 'react'
import { ReactComponent as Android } from '../../assets/img/Android.svg'
import { ReactComponent as AppUser } from '../../assets/img/AppUser.svg'
import { ANDROID_APP_STORE_LINK } from '../../config'
import { useInstalled, useSizes } from '../../common/hooks'
import './AndroidApp.scss'

export function AndroidApp(): ReactElement {
  const installed = useInstalled()
  const [, , , lg] = useSizes()

  return (
    <>
      {!installed && (
        <div className="android-app box-padding">
          <div className="col-md-10 col-lg-8 col-xl-6 p-4 mx-auto text-center">
            {lg && <AppUser className="app-user" />}
            <h1>Get the App</h1>
            <br />
            <a className="btn btn-outline mt-3" href={ANDROID_APP_STORE_LINK}>
              Go to Play Store <Android className="android" />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
