import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../common/hooks'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { ReactComponent as Logo } from '../../assets/img/Logo.svg'
import { StepByStepGuide } from './StepByStepGuide'
import { AndroidApp } from './AndroidApp'
import './LandingPage.scss'

export function LandingPage(): ReactElement {
  const content = useLanguage()
  const title = 'Blicc'
  const description = 'Visualize your data with customizable dashboards.'
  const path = '/'

  return (
    <>
      <MetaData title={title} description={description} path={path} />
      <div className="col-md-5 mx-auto text-center box-padding">
        <Logo height="100px" />
        <h1 className="display-4 font-weight-normal">{content.brand}</h1>
        <p className="lead font-weight-normal">{content.brandDescription}</p>
        <Link className="btn btn-outline-primary" to="/dashboards">
          {content.getStarted}
        </Link>
      </div>
      <AndroidApp />
      <StepByStepGuide />
    </>
  )
}
