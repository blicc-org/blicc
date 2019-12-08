import React from 'react'
import { Lock } from 'react-feather'

export function DeleteAccountModal({
  cancel,
  submit,
  hasTwoFactorAuth,
  setToken,
  setPassword,
}) {
  return (
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Delete Account</h5>
          <button onClick={cancel} type="button" className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {hasTwoFactorAuth && (
            <div className="form-group">
              <label htmlFor="token">2FA Token</label>
              <div className="input-group">
                <input
                  id="token"
                  className="form-control"
                  onChange={event => setToken(event.target.value)}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <Lock size={18} />
                  </span>
                </div>
              </div>
              <small id="emailHelp" className="form-text text-muted">
                Enter 2FA token to verify yourself.
              </small>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              onChange={event => setPassword(event.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              Enter your password to verify yourself.
            </small>
          </div>
        </div>
        <div className="modal-footer">
          <button
            onClick={cancel}
            type="button"
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
          <button onClick={submit} type="button" className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
