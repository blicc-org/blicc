import React from 'react'
import { ChartsItem } from './ChartsItem'

export function Charts() {
  const plugins = ['@essentials/pie-chart', '@essentials/line-chart']

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Charts</h2>
        </div>

        <div className="chart-list">
          {plugins.length === 0 ? (
            <p className="text-muted mx-auto py-5 my-5 text-center">
              No charts fount.
            </p>
          ) : (
            <table className="table">
              <tbody>
                {plugins.map(plugin => {
                  return (
                    <ChartsItem key={plugin} path={plugin}>
                      {plugin}
                    </ChartsItem>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}
