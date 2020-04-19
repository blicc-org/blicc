import { useContext } from 'react'
import { FeatureContext } from '../context'

export function useInstalled(): boolean {
  const [features] = useContext(FeatureContext)
  const { installed } = features
  return installed
}
