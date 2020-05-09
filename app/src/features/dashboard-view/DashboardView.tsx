import React, { useEffect, useState, useContext, ReactElement } from 'react'
import statusCode from 'http-status-codes'
import { Redirect } from 'react-router-dom'
import { Arrangement } from '../../common/components/arrangement/Arrangement'
import {
  useEndpoint,
  useModal,
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
  Heading,
  Button,
  ButtonType,
} from '../../common/components/ui'
import { ModalShare } from '../../common/components/modal/ModalShare'
import './DashboardView.scss'

export function DashboardView({ match, location }: any): ReactElement {
  const content = useLanguage()
  const isFullscreen = location.search === '?fullscreen'
  const [arrangement, setArrangement] = useContext(ArrangementContext)
  const [settings, setSettings] = useContext(SettingsContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const path = `/dashboards/${match.params.id}`
  const [, access, update, remove] = useEndpoint(path)
  const [dashboard, setDashboard] = useState({
    creationDate: undefined,
    data: undefined,
  })
  const { creationDate } = dashboard
  const [edit, setEdit] = useState(
    location.search && location.search === '?edit'
  )
  const [redirect, setRedirect] = useState('')
  const tabs = [content.dashboard, content.details]
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const isMobile = useMobile()
  const isInstalled = useInstalled()

  const style =
    isMobile && isInstalled
      ? { height: window.innerHeight - 90 }
      : { height: window.innerHeight - 40 }

  useEffect(() => {
    async function fetchData(): Promise<void> {
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

  async function onClick(evt: any): Promise<void> {
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
      submit={async (): Promise<void> => {
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
        <Heading title={title}>
          <Button
            type={edit ? ButtonType.Primary : ButtonType.OutlineSecondary}
            onClick={onClick}
          >
            {edit ? 'Save' : 'Edit'}
          </Button>
          <Button type={ButtonType.Info} onClick={showShareModal}>
            Share
          </Button>
        </Heading>
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === tabs[0] ? (
          <>
            {edit && <Toolbox />}
            {dashboard.data && (
              <Arrangement edit={edit} isFullscreen={isFullscreen} />
            )}
          </>
        ) : (
          <DashboardDetails
            edit={edit}
            remove={showModal}
            title={title}
            setTitle={setTitle}
            creationDate={creationDate}
            description={description}
            setDescription={setDescription}
          />
        )}
      </div>
    </>
  )
}
