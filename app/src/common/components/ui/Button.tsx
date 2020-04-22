import React, { ReactElement, MouseEvent } from 'react'

interface Props {
  children: string
  onClick: (evt: MouseEvent) => void
  type: ButtonType
}

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  OutlineSecondary = 'outline-secondary',
}

export function Button({ children, onClick, type }: Props): ReactElement {
  return (
    <button
      title={children}
      type="button"
      className={`btn btn-${type} m-1`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
