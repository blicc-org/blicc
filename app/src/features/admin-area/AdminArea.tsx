import React, { useState } from 'react'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { Tabs } from '../../common/components/ui'
import { Users } from './Users'
import { Network } from './Network'

export function AdminArea() {
  const tabs = ['Network', 'Users']
  const [currentTab, setCurrentTab] = useState(tabs[0])

  return (
    <>
      <MetaData
        title={'Admin Area'}
        description={'Access admin tools'}
        path={'/admin-area'}
      />
      <div className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Admin Area</h2>
        </div>
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === tabs[0] ? <Network /> : <Users />}
      </div>
    </>
  )
}
