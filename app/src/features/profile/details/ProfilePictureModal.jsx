import React from 'react'

export function ProfilePictureModal({ cancel, submit }) {
  return (
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Upload profile picture</h5>
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
          <div class="custom-file mr-2 mb-2">
            <input
              type="file"
              class="custom-file-input"
              id="inputGroupFile02"
            />
            <label class="custom-file-label" for="inputGroupFile02">
              Choose picture
            </label>
          </div>
          <p>
            <small className="text-muted">
              The profile picture should have at least 640x640 pixels.
            </small>
          </p>
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
            className="btn btn-danger"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
