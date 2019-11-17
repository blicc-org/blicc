import React from 'react'
import { useMobile } from '../../hooks'

export function Pagination({ page, setPage, itemsPerPage, total }) {
  const isMobile = useMobile()
  const numOfPages = total === 0 ? 0 : Math.floor((total -1) / itemsPerPage)
  const range = isMobile ? 2 : 4
  const buttom = page - range > 0 ? page - range : 0
  const top = page + range < numOfPages ? page + range : numOfPages

  let pageLinks = []
  for (let i = buttom; i <= top; i++) {
    pageLinks.push(
      <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
        <button
          className="page-link"
          onClick={() => {
            setPage(i)
          }}
        >
          {i + 1}
        </button>
      </li>
    )
  }

  return (
    <ul className="pagination justify-content-center pb-4">
      {numOfPages > 0 && (
        <>
          <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(0)}>
              « First
            </button>
          </li>
          {page > 0 && (
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(page - 1)}>
                Prev
              </button>
            </li>
          )}
          {pageLinks}
          {page < numOfPages && (
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(page + 1)}>
                Next
              </button>
            </li>
          )}
          <li className={`page-item ${page === numOfPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(numOfPages)}>
              Last »
            </button>
          </li>
        </>
      )}
    </ul>
  )
}
