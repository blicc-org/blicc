import React from 'react'

export function CreateDashboardModal({
  cancel,
  submit,
  setTitle,
  setDescription,
}: any) {
  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add new dashboard</h5>
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
              <label htmlFor="dashboard_title">Title</label>
              <input
                id="dashboard_title"
                className="form-control"
                onChange={(event) => setTitle(event.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                Name your dashboard with a significant title.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="dashboard_description">Description</label>
              <textarea
                className="form-control"
                id="dashboard_description"
                rows={3}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">
                Add a helpful description (optional).
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
