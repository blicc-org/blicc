import React from 'react'
import { Tabs } from '../../common/components/ui'
export function DashboardHeader({
  title,
  edit,
  onSubmit,
  tabs,
  currentTab,
  setCurrentTab,
}) {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
        <h2 className="my-0">{title}</h2>
        <div className="btn-toolbar">
          {edit ? (
            <button
              title="Save dashboard"
              type="button"
              className="btn btn-sm btn-primary"
              onClick={onSubmit}
            >
              Save
            </button>
          ) : (
            <button
              title="Edit dashboard"
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={onSubmit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </>
  )
}
