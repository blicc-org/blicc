import React, { useEffect, useState } from 'react'
import statusCode from 'http-status-codes'
import { Lock } from 'react-feather'
import { useApiEndpoint, useToast } from '../../common/hooks'
import { Redirect } from 'react-router-dom'
import { QRCode } from '../../common/components/qr-code/QRCode'
import './TwoFactorAuth.scss'

export function TwoFactorAuth() {
  const [enable, requestSecret, ,] = useApiEndpoint('/two-factor-auth')
  const [url, setUrl] = useState('')
  const [token, setToken] = useState('')
  const [redirect, setRedirect] = useState('')
  const showToast = useToast()

  async function onClick(e: any) {
    e.preventDefault()
    const [status] = await enable({ token })
    if (status === statusCode.NO_CONTENT) {
      showToast('Success', 'Two-factor Authentication is enabled!', 'success')
      setRedirect('/dashboards')
    } else {
      showToast('Error', 'Something went wrong, please try again!', 'danger')
      setRedirect('/profile')
    }
  }

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
      {redirect && <Redirect to={redirect} />}
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
          <div className="input-group input-group-lg mb-3">
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
            title="Submit two-factor authentication"
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={onClick}
          >
            Activate
          </button>
        </form>
      </div>
    </>
  )
}
