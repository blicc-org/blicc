import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../hooks'
import './Result.scss'

export function Result({ show, results, total, close }) {
  const content = useLanguage()
  return (
    <>
      {show && (
        <div className="result">
          <h6>
            {content.search.results} <small>{total}</small>
          </h6>
          <hr />
          <ul className="list-unstyled">
            {results.map((result) => {
              return (
                <li className="media" key={result.id}>
                  <Link
                    className="media-body"
                    to={`/dashboards/${result.id}`}
                    onClick={close}
                  >
                    <h5 className="mt-0 mb-1">{result.title}</h5>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
