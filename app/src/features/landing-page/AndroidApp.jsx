import React from 'react'
import { ReactComponent as Android } from '../../assets/img/Android.svg'
import { ANDROID_APP_STORE_LINK } from '../../config'
import { useInstalled } from '../../common/hooks'
import './AndroidApp.scss'

export function AndroidApp() {
  const installed = useInstalled()
  return (
    <>
      {!installed && (
        <div className="android-app py-5">
          <div className="col-md-10 col-lg-8 col-xl-6 p-4 mx-auto text-center">
            <h1>Android App</h1>
            <br />
            <a className="btn btn-outline mt-3" href={ANDROID_APP_STORE_LINK}>
              Go to Play Store <Android className="android" alt="Android App" />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
