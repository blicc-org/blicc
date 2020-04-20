import React, { useState, useContext, useEffect } from 'react'
import { useApiEndpoint } from '../../common/hooks'
import { AppContext } from '../../common/context'
import { Details } from './details/Details'
import { DeleteAccount } from './delete-account/DeleteAccount'
import { TwoFactorAuth } from './two-factor-auth/TwoFactorAuth'

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  creationDate: string;
  hasTwoFactorAuth: boolean;
}

export function Profile() {
  const [appState] = useContext(AppContext)
  const { id } = appState
  const [, access, update] = useApiEndpoint(`/users/${id}`)

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
    async function fetchUser() {
      const [, user] = await access()
      setUser(user)
    }
    fetchUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="container pb-5">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
        <h2 className="my-0">Profile</h2>
      </div>
      <div className="col px-0">
        <Details
          user={user}
          setUser={setUser}
          update={async () => await update(user)}
        />
        <TwoFactorAuth user={user} setUser={setUser} />
        <DeleteAccount user={user} />
      </div>
    </div>
  )
}
