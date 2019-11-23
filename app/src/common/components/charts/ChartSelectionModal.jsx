import React from 'react'

export function ChartSelectionModal({ cancel, submit }) {
  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select a chart type</h5>
            <button onClick={cancel} type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-footer">
            <button
              onClick={cancel}
              type="button"
              className="btn btn-outline-secondary"
            >
              Cancel
            </button>
            <button onClick={submit} type="button" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
