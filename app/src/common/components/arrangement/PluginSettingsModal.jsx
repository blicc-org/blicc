import React from 'react'
import { UNIT } from './Plugin'

export function PluginSettingsModal({ cancel, submit, unit, setUnit }) {
  const { xAxis, yAxis } = unit
  const setXAxis = val => setUnit({ ...unit, xAxis: val })
  const setYAxis = val => setUnit({ ...unit, yAxis: val })
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
              <label htmlFor="inputState">Select Unit for X-Axis</label>
              <select
                id="inputState"
                className="form-control"
                value={xAxis}
                onChange={evt => setXAxis(evt.target.value)}
              >
                <option value={UNIT.NUMBER}>Number</option>
                <option value={UNIT.CATEGORY}>Category</option>
                <option value={UNIT.TIME}>Time</option>
              </select>
              <small id="emailHelp" className="form-text text-muted">
                Select either time, category or number as unit.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="inputState">Select Unit for Y-Axis</label>
              <select
                id="inputState"
                className="form-control"
                value={yAxis}
                onChange={evt => setYAxis(evt.target.value)}
              >
                <option value={UNIT.NUMBER}>Number</option>
                <option value={UNIT.CATEGORY}>Category</option>
                <option value={UNIT.TIME}>Time</option>
              </select>
              <small id="emailHelp" className="form-text text-muted">
                Select either time, category or number as unit.
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
