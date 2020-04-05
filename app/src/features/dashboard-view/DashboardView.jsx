import React, { useEffect, useState, useContext } from 'react'
import statusCode from 'http-status-codes'
import { Redirect } from 'react-router-dom'
import { Arrangement } from '../../common/components/arrangement/Arrangement'
import {
  useApiEndpoint,
  useModal,
  usePublisher,
  useMobile,
  useInstalled,
  useLanguage,
} from '../../common/hooks'
import { ArrangementContext, SettingsContext } from '../../common/context'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { DashboardDetails } from './DashboardDetails'
import { Toolbox } from '../../common/components/toolbox/Toolbox'
import {
  ConfirmationModal,
  Tabs,
  UpdateButton,
} from '../../common/components/ui'
import { ModalShare } from '../../common/components/modal/ModalShare'
import './DashboardView.scss'

export function DashboardView({ match, location }) {
  const content = useLanguage()
  const fullscreen = location.search === '?fullscreen'
  const [arrangement, setArrangement] = useContext(ArrangementContext)
  const [settings, setSettings] = useContext(SettingsContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const path = `/dashboards/${match.params.id}`
  const [, access, update, remove] = useApiEndpoint(path)
  const [dashboard, setDashboard] = useState({})
  const { userId, creationDate } = dashboard
  const [edit, setEdit] = useState(
    location.search && location.search === '?edit'
  )
  const [redirect, setRedirect] = useState('')
  const tabs = [content.dashboard, content.details]
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [publishAll] = usePublisher()
  const isMobile = useMobile()
  const isInstalled = useInstalled()

  const style =
    isMobile && isInstalled
      ? { height: window.innerHeight - 90 }
      : { height: window.innerHeight - 40 }

  useEffect(() => {
    publishAll()
    // eslint-disable-next-line
  }, [settings])

  useEffect(() => {
    async function fetchData() {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        setDashboard(data)
        setArrangement(data.data.arrangement)
        setSettings(data.data.settings)
        setTitle(data.title)
        setDescription(data.description)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [match])

  async function onClick(evt) {
    evt.target.blur()
    if (edit) {
      await update({
        ...dashboard,
        title,
        description,
        data: { arrangement, settings },
      })
      setEdit(false)
      setRedirect(`/dashboards/${match.params.id}`)
    } else {
      setEdit(true)
    }
  }

  const [showModal, hideModal] = useModal(() => (
    <ConfirmationModal
      title="Delete Dashboard"
      description="Do you really want to delete the dashboard?"
      submitPhrase="Delete"
      submit={async () => {
        hideModal()
        const [status] = await remove()
        if (status === statusCode.OK) {
          setRedirect('/dashboards')
        }
      }}
      cancel={hideModal}
    />
  ))

  const [showShareModal, hideShareModal] = useModal(() => (
    <ModalShare cancel={hideShareModal} id={match.params.id} title={title} />
  ))

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <MetaData title={title} description={description} path={path} />
      <div className="container-fluid dashboard" style={style}>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">{title}</h2>
          <div className="btn-toolbar">
            <UpdateButton edit={edit} onClick={onClick} />
            <button
              className="btn btn-info ml-2"
              type="button"
              onClick={showShareModal}
            >
              Share
            </button>
          </div>
        </div>
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === tabs[0] ? (
          <>
            {edit && <Toolbox />}
            {dashboard.data && (
              <Arrangement edit={edit} fullscreen={fullscreen} />
            )}
          </>
        ) : (
          <DashboardDetails
            edit={edit}
            remove={showModal}
            title={title}
            setTitle={setTitle}
            userId={userId}
            creationDate={creationDate}
            description={description}
            setDescription={setDescription}
          />
        )}
      </div>
    </>
  )
}
