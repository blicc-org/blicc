import React from 'react'

export function UpdateButton({ edit, onClick }: any) {
  return (
    <>
      <button
        title="Update Resource"
        type="button"
        className={`btn ${edit ? 'btn-primary' : 'btn-outline-secondary'}`}
        onClick={(evt) => {
          onClick(evt)
        }}
      >
        {edit ? 'Save' : 'Edit'}
      </button>
    </>
  )
}
