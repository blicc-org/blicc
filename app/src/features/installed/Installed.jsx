import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { FeatureContext } from '../../common/context/FeatureContext'

export function Installed() {
  const [, setFeatures] = useContext(FeatureContext)
  setFeatures(prev => ({ ...prev, installed: true }))
  return <Redirect to="/" />
}
