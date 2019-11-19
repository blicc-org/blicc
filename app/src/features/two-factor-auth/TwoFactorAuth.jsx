import React, { useEffect, useState } from 'react'
import { Lock } from 'react-feather'
import { useApiEndpoint } from '../../common/hooks'
import { Redirect } from 'react-router-dom'
import { QRCode } from '../../common/components/qr-code/QRCode'
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
          <div className="input-group input-group-lg mb-3 px-5">
            <input
              className="form-control"
              type="text"
              onChange={({ target: t }) => setToken(t.value)}
              autoComplete="off"
              required
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <Lock size={18} />
              </span>
            </div>
          </div>
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
