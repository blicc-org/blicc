import { useContext } from 'react'
import { FeatureContext } from '../context'

export function useFeatures() {
  const [features] = useContext(FeatureContext)
  const { installed } = features
  return [installed]
}
