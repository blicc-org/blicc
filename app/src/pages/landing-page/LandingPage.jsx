import React from 'react'
import { Link } from 'react-router-dom'
import { content } from '../../content/english'
import { MetaData } from '../../components/meta-data/MetaData'
import { ReactComponent as Maskot } from '../../assets/img/Maskot.svg'

export function LandingPage() {
  const title = 'blicc.org'
  const description = 'Visualize your data with customizable dashboards.'
  const path = '/'
  return (
    <>
      <MetaData title={title} description={description} path={path} />
      <div className="col-md-5 mx-auto py-5 my-5 text-center">
        <Maskot height={'100px'} alt="maskot" />
        <h1 className="display-4 font-weight-normal">
          {content.metadata.title}
        </h1>
        <p className="lead font-weight-normal">
          {content.metadata.description}
        </p>
        <Link className="btn btn-outline-primary" to="/dashboards">
          Get started
        </Link>
      </div>
    </>
  )
}
