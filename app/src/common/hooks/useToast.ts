import { useContext } from 'react'
import { ToastContext } from '../context'

export function useToast(): any {
  const [, showToast] = useContext(ToastContext)
  return showToast
}
