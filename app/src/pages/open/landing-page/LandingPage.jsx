import React from 'react'
import { Link } from 'react-router-dom'
import { content } from '../../../config/language/english'
import { ReactComponent as Maskot } from './Maskot.svg'

export function LandingPage() {
  return (
    <div className="col-md-5 mx-auto py-5 my-5 text-center">
      <Maskot height={'100px'} alt="maskot" />
      <h1 className="display-4 font-weight-normal">{content.metadata.title}</h1>
      <p className="lead font-weight-normal">{content.metadata.description}</p>
      <Link className="btn btn-outline-primary" to="/dashboards">
        Get started
      </Link>
    </div>
  )
}
