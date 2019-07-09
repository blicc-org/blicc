import React from 'react'
import Copyright from './Copyright'

export default function FooterLogo() {
  return (
    <div className="col-12 col-md">
      <h3>blicc.org</h3>
      <small className="d-block mb-3 text-muted">
        <Copyright />
      </small>
    </div>
  )
}
