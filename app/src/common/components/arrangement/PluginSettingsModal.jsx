import React from 'react'

export function PluginSettingsModal({ cancel, submit, unit, setUnit }) {
  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Settings</h5>
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
              <label htmlFor="inputState">Select Unit</label>
              <select
                id="inputState"
                className="form-control"
                value={unit}
                onChange={event => setUnit(event.target.value)}
              >
                <option value={'time'}>Time</option>
                <option value={'category'}>Category</option>
                <option value={'number'}>Number</option>
              </select>
              <small id="emailHelp" className="form-text text-muted">
                Select unit for X-Axis.
              </small>
            </div>
          </div>
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
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
