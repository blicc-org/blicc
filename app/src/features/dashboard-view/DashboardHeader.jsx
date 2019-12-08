import React from 'react'
import { Tabs } from '../../common/components/ui'
import './DashboardHeader.scss'

export function DashboardHeader({
  title,
  onSave,
  tabs,
  currentTab,
  setCurrentTab,
}) {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
        <h2 className="my-0">{title}</h2>
        <div className="btn-toolbar">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
      <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </>
  )
}
