import React from 'react'
import { Link } from 'react-router-dom'
import './Result.scss'

export function Result({ show, results, close }) {
  return (
    <>
      {show && (
        <div className="result">
          <h6>
            Results <small>{`${results.length} found.`}</small>
          </h6>
          <hr />
          <ul className="list-unstyled">
            {results.map(result => {
              return (
                <li className="media" key={result.id}>
                  <div className="media-body">
                    <Link to={`/dashboards/${result.id}`} onClick={() => close()}>
                      <h5 className="mt-0 mb-1">{result.title}</h5>
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
