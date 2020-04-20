import React, { ReactElement } from 'react'
import { useMobile } from '../../hooks'

export function Pagination({
  page,
  setPage,
  itemsPerPage,
  total,
}: any): ReactElement {
  const isMobile = useMobile()
  const numOfPages = total === 0 ? 0 : Math.floor((total - 1) / itemsPerPage)
  const range = isMobile ? 0 : 4
  const buttom = page - range > 0 ? page - range : 0
  const top = page + range < numOfPages ? page + range : numOfPages

  const pageLinks = []
  for (let i = buttom; i <= top; i++) {
    pageLinks.push(
      <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
        <button
          title="Go to specific page"
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
            <button
              title="Go to first page"
              className="page-link"
              onClick={() => setPage(0)}
            >
              « First
            </button>
          </li>
          {page > 0 && (
            <li className="page-item">
              <button
                title="Go to previous page"
                className="page-link"
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>
            </li>
          )}
          {pageLinks}
          {page < numOfPages && (
            <li className="page-item">
              <button
                title="Go to next page"
                className="page-link"
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </li>
          )}
          <li className={`page-item ${page === numOfPages ? 'disabled' : ''}`}>
            <button
              title="Go to last page"
              className="page-link"
              onClick={() => setPage(numOfPages)}
            >
              Last »
            </button>
          </li>
        </>
      )}
    </ul>
  )
}
