import React, { useContext, ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import { FeatureContext } from '../../common/context/FeatureContext'

export function Installed(): ReactElement {
  const [features, setFeatures] = useContext(FeatureContext)
  setFeatures({ ...features, installed: true })
  return <Redirect to="/" />
}
