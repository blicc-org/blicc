import React, { useState, useContext, useEffect, ReactElement } from 'react'
import { useEndpoint } from '../../common/hooks'
import { AppContext } from '../../common/context'
import { Details } from './details/Details'
import { DeleteAccount } from './delete-account/DeleteAccount'
import { TwoFactorAuth } from './two-factor-auth/TwoFactorAuth'
import { Heading, Button, ButtonType } from '../../common/components/ui'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  creationDate: string
  hasTwoFactorAuth: boolean
}

export function Profile(): ReactElement {
  const [appState] = useContext(AppContext)
  const { id } = appState
  const [, access, update] = useEndpoint(`/users/${id}`)
  const [edit, setEdit] = useState(false)

  async function onClick(): Promise<void> {
    if (edit) {
      await update()
      setEdit(false)
    } else {
      setEdit(true)
    }
  }

  const [user, setUser] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    creationDate: '',
    hasTwoFactorAuth: false,
  })

  useEffect(() => {
    async function fetchUser(): Promise<void> {
      const [, user] = await access()
      setUser(user)
    }
    fetchUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container pb-5">
      <Heading title="Profile">
        <Button
          type={edit ? ButtonType.Primary : ButtonType.OutlineSecondary}
          onClick={onClick}
        >
          {edit ? 'Save' : 'Edit'}
        </Button>
      </Heading>
      <div className="col px-0">
        <Details user={user} setUser={setUser} edit={edit} />
        <TwoFactorAuth user={user} setUser={setUser} />
        <DeleteAccount user={user} />
      </div>
    </div>
  )
}
