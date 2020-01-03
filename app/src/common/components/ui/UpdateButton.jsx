import React from 'react'

export function UpdateButton({ edit, onClick }) {
  return (
    <>
      {edit ? (
        <button
          title="Save dashboard"
          type="button"
          className="btn btn-primary"
          onClick={evt => {
            evt.target.blur()
            onClick(evt)
          }}
        >
          Save
        </button>
      ) : (
        <button
          title="Edit dashboard"
          type="button"
          className="btn  btn-outline-secondary"
          onClick={evt => {
            evt.target.blur()
            onClick(evt)
          }}
        >
          Edit
        </button>
      )}
    </>
  )
}
