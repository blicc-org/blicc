import React from 'react'

export function CreateDataSourceModal({
  cancel,
  submit,
  setTitle,
  setPersistData,
  setFrequency,
  setUrl,
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
              <label htmlFor="data_source_url">Target url</label>
              <input
                id="data_source_url"
                className="form-control"
                onChange={event => setUrl(event.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                Set the data source url.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="data_source_title">Title</label>
              <input
                id="data_source_title"
                className="form-control"
                onChange={event => setTitle(event.target.value)}
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
                value={'a'}
                onChange={event => setFrequency(event.target.value)}
              >
                <option>daily</option>
                <option>mounthly</option>
                <option>yearly</option>
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
