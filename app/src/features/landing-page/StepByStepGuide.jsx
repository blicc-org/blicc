import React from 'react'
import { Link } from 'react-router-dom'
import './StepByStepGuide.scss'

export function StepByStepGuide() {
  return (
    <div className="col-md-10 col-lg-8 col-xl-6 p-4 my-5 mx-auto guide">
      <ol class="gradient-list">
        <li>
          <h4>Fetch your data from external API</h4>
          <p>
            The data has to be transformed to be used inside the diagrams. This
            can be done with the help of <code>jmespath</code>, a json query
            language. Read more about how to query the data{' '}
            <Link to="/data-sources">here</Link>.
          </p>
        </li>
        <li>
          <h4>Process your data</h4>
          <p>
            The data has to be transformed to be used inside the diagrams. This
            can be done with the help of <code>jmespath</code>, a json query
            language. Read more about how to query the data{' '}
            <Link to="/">here</Link>.
          </p>
        </li>
        <li>
          <h4>Create a dashboard</h4>
          <p>
            The data has to be transformed to be used inside the diagrams. This
            can be done with the help of <code>jmespath</code>, a json query
            language. Read more about how to query the data{' '}
            <Link to="/">here</Link>.
          </p>
        </li>
      </ol>
    </div>
  )
}
