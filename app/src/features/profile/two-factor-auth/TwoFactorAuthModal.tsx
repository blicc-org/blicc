import React, { ReactElement } from 'react'
import { Lock } from 'react-feather'

interface Props {
  cancel: () => void;
  submit: () => void;
  setToken: (token: string) => void;
}

export function TwoFactorAuthModal({
  cancel,
  submit,
  setToken,
}: Props): ReactElement {
  return (
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Disable Two-factor authentication</h5>
          <button
            title="Close modal"
            onClick={cancel}
            type="button"
            className="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <div className="input-group input-group-lg">
              <input
                id="disable_2fa_title"
                className="form-control"
                type="text"
                onChange={(evt): void => setToken(evt.target.value)}
                autoComplete="off"
                required
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <Lock size={18} />
                </span>
              </div>
            </div>
            <small id="emailHelp" className="form-text text-muted">
              Insert 2FA token to verify yourself.
            </small>
          </div>
        </div>
        <div className="input-group input-group-lg mb-3 px-5"></div>
        <div className="modal-footer">
          <button
            title="Cancel modal"
            onClick={cancel}
            type="button"
            className="btn btn-outline-secondary"
          >
            Cancel
          </button>
          <button
            title="Submit modal"
            onClick={submit}
            type="button"
            className="btn btn-danger"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
