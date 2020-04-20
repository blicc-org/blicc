import React, { ReactElement } from 'react'

export function UpdateButton({ edit, onClick }: any): ReactElement {
  return (
    <>
      <button
        title="Update Resource"
        type="button"
        className={`btn ${edit ? 'btn-primary' : 'btn-outline-secondary'}`}
        onClick={(evt): void => {
          onClick(evt)
        }}
      >
        {edit ? 'Save' : 'Edit'}
      </button>
    </>
  )
}
