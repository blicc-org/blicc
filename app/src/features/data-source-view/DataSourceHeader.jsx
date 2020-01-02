import React from 'react'
import { Tabs } from '../../common/components/ui'

export function DataSourceHeader({ title, tabs, currentTab, setCurrentTab }) {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
        <h2 className="my-0">{title}</h2>
      </div>
      <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </>
  )
}
