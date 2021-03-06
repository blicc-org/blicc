import React, { ReactElement, ChangeEvent } from 'react'
import { API } from '../../../config'

interface Props {
  userId: string
  cancel: () => void
  submit: () => void
}

type FileEventTarget = HTMLInputElement & { files: FileList }

export function ProfilePictureModal({
  userId,
  cancel,
  submit,
}: Props): ReactElement {
  const formData = new FormData()
  const onChange = (evt: ChangeEvent<FileEventTarget>): void => {
    formData.append('image', evt.target.files[0])
  }

  async function upload(): Promise<void> {
    try {
      const r = await fetch(`${API.ORIGIN}/profile-pictures/${userId}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      })
      console.log('HTTP response code:', r.status)
      submit()
    } catch (e) {
      console.log('Huston we have problem...:', e)
    }
  }

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
            Select an image with at least 640x640 pixels. If the image is not a
            square it will be cropped automatically.
          </p>
          <div className="custom-file mr-2 mb-2" style={{ cursor: 'pointer' }}>
            <input
              type="file"
              className="custom-file-input"
              id="inputProfilePicture"
              style={{ cursor: 'pointer' }}
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="inputProfilePicture">
              Select image...
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
            onClick={upload}
            type="button"
            className="btn btn-primary"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
