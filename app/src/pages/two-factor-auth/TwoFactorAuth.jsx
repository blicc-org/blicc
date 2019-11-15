import React, { useEffect, useState } from 'react'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'
import { Redirect } from 'react-router-dom'
import { QRCode } from '../../components/qr-code/QRCode'
import { Pin } from '../../components/form/pin/Pin'
import './TwoFactorAuth.scss'

export function TwoFactorAuth() {
  const [enable, requestSecret, ,] = useApiEndpoint('/two-factor-auth')
  const [url, setUrl] = useState('')
  const [token, setToken] = useState('')
  const [onSuccess, setOnSuccess] = useState(false)

  useEffect(() => {
    async function fetchChallengeUrl() {
      const [, { otpAuthUrl }] = await requestSecret()
      setUrl(otpAuthUrl)
    }
    fetchChallengeUrl()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {' '}
      {onSuccess && <Redirect to="/dashboards" />}
      <div className="col-md-5 mx-auto py-5 my-5 text-center">
        <form className="form-two-factor-auth">
          <h1 className="h3 mb-3 font-weight-normal">Two-factor auth</h1>
          <QRCode url={url}></QRCode>
          <div className="checkbox mb-3">
            Scan the QR Code with your favorite two-factor authentication app
            like Authy, Google Authenticator etc.
          </div>
          <label htmlFor="token" className="sr-only">
            Token
          </label>
          <Pin size={6} setPin={setToken} />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={async e => {
              e.preventDefault()
              await enable({ token })
              setOnSuccess(true)
            }}
          >
            Activate
          </button>
        </form>
      </div>
    </>
  )
}
