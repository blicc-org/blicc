import React from 'react'
import { MetaData } from '../../common/components/meta-data/MetaData'
import './ChartView.scss'

export function ChartView({ match }) {
  return (
    <>
      <MetaData
        title={'chart view'}
        description={'chart view ...'}
        path={'/charts/:id'}
      />
      <div className="container-fluid dashboard">{match}</div>
    </>
  )
}
