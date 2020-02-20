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
            To fetch data from an API you need to create a new{' '}
            <Link to="/data-sources">data source</Link>.
          </p>
        </li>
        <li>
          <h4>Process your data</h4>
          <p>
            To process the data the application uses a json query language
            called <code>jmespath</code>. A tutorial of how to use the query
            language can be found{' '}
            <a href="http://jmespath.org/tutorial.html">data source</a>. The
            output of the data has to have a valid <code>chart.js</code> data
            format.
          </p>
        </li>
        <li>
          <h4>Create a dashboard</h4>
          <p>
            A dashboard can be created <Link to="/dashboards">here</Link>. Click
            the edit button and then the plus button on the lower right corner.
            Then simply drag a chart type and a data source into the dashboard.
          </p>
        </li>
      </ol>
    </div>
  )
}
