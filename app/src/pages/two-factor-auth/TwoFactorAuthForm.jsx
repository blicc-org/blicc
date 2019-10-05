import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { QRCode } from '../../components/qr-code/QRCode'
import { Pin } from '../../components/form/pin/Pin'
import './TwoFactorAuthForm.scss'

export function TwoFactorAuthForm({ url, enable }) {
  const [token, setToken] = useState('')
  const [onSuccess, setOnSuccess] = useState(false)
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
          <Pin size={4} setPin={setToken} />
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
