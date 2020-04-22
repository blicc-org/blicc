import React, { useState, ReactElement } from 'react'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { Tabs, Heading } from '../../common/components/ui'
import { Users } from './Users'
import { Network } from './Network'

export function AdminArea(): ReactElement {
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
        <Heading title="Admin Area" />
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
