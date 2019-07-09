import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../AppContext'

export default function Headline() {
  const { metadata } = useContext(AppContext)

  return (
    <div className="col-md-5 mx-auto py-5 my-5 text-center">
      <h1 className="display-4 font-weight-normal">{metadata.title}</h1>
      <p className="lead font-weight-normal">{metadata.description}</p>
      <Link className="btn btn-outline-secondary" to="/dashboard">
        Get started
      </Link>
    </div>
  )
}
