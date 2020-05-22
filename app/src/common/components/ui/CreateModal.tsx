import React, { ReactElement, Dispatch, SetStateAction } from 'react'

interface SimpleResource {
  title: string
  description: string
}

interface Pros<T extends SimpleResource> {
  name: string
  cancel: () => void
  submit: () => void
  setResource: Dispatch<SetStateAction<T>>
}

export function CreateModal<T extends SimpleResource>({
  name,
  cancel,
  submit,
  setResource,
}: Pros<T>): ReactElement {
  const titleId = `${name.replace(' ', '')}_title`
  const descriptionId = `${name.replace(' ', '')}_description`
  const setTitle = (title: string): void => {
    setResource((res) => ({ ...res, title }))
  }
  const setDescription = (description: string): void => {
    setResource((res) => ({ ...res, description }))
  }

  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{`Create new ${name}`}</h5>
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
              <label htmlFor={titleId}>Title</label>
              <input
                id={titleId}
                autoComplete="off"
                className="form-control"
                onChange={(event): void => setTitle(event.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted">
                Name your resource with a meaningful title.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor={descriptionId}>Description</label>
              <textarea
                className="form-control"
                id={descriptionId}
                autoComplete="off"
                rows={3}
                onChange={(event): void => setDescription(event.target.value)}
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
