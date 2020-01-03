import React from 'react'

export function UpdateButton({ edit, onClick }) {
  return (
    <>
      {edit ? (
        <button
          title="Save dashboard"
          type="button"
          className="btn btn-primary"
          onClick={onClick}
        >
          Save
        </button>
      ) : (
        <button
          title="Edit dashboard"
          type="button"
          className="btn  btn-outline-secondary"
          onClick={onClick}
        >
          Edit
        </button>
      )}
    </>
  )
}
