import React, { lazy, Suspense } from 'react'

export function ChartGenerator({ chartType }) {
  const Plugin = lazy(() => import(`../../../plugins/${chartType}`))

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Plugin />
      </Suspense>
    </>
  )
}
