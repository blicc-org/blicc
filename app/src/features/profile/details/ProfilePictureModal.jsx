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
          <p>
            The profile picture should be a jpeg or png image with at least
            640x640 pixels.
          </p>
          <div class="custom-file mr-2 mb-2" style={{ cursor: 'pointer' }}>
            <input
              type="file"
              class="custom-file-input"
              id="inputGroupFile02"
              style={{ cursor: 'pointer' }}
            />
            <label class="custom-file-label" for="inputGroupFile02">
              Choose picture
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
            className="btn btn-danger"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
