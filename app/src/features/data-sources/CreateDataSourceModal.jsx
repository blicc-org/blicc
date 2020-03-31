import React from 'react'
import { FREQUENCY } from './DataSources'

export function CreateDataSourceModal({
  cancel,
  submit,
  setTitle,
  setPersistData,
  fetchFrequency,
  setFetchFrequency,
}) {
  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add new data source</h5>
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
              <label htmlFor="data_source_title">Title</label>
              <input
                id="data_source_title"
                className="form-control"
                onChange={(event) => setTitle(event.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                Name your data source with a significant title.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="inputState">Fetch frequency</label>
              <select
                id="inputState"
                className="form-control"
                value={fetchFrequency}
                onChange={(event) =>
                  setFetchFrequency(parseInt(event.target.value))
                }
              >
                <option value={FREQUENCY.DAILY}>daily</option>
                <option value={FREQUENCY.MONTHLY}>mounthly</option>
                <option value={FREQUENCY.YEARLY}>yearly</option>
              </select>
              <small id="emailHelp" className="form-text text-muted">
                Set a period for a data fetch cronjob.
              </small>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="data_source_persist"
                onChange={(event) => setPersistData(event.target.checked)}
              />
              <label className="form-check-label" htmlFor="data_source_persist">
                Persist data
              </label>
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
