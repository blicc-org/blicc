import { useContext } from 'react'
import { ToastContext } from '../context'

export function useToast() {
  const [, showToast] = useContext(ToastContext)
  return showToast
}
