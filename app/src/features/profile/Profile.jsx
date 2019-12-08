import React, { useState, useContext, useEffect } from 'react'
import { useApiEndpoint } from '../../common/hooks'
import { AppContext } from '../../common/context'
import { Details } from './details/Details'
import { DeleteAccount } from './delete-account/DeleteAccount'
import { TwoFactorAuth } from './two-factor-auth/TwoFactorAuth'

export function Profile() {
  const [appState] = useContext(AppContext)
  const { id } = appState
  const [, accessUser, ,] = useApiEndpoint(`/users/${id}`)
  const [reload, setReload] = useState(0)

  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    creationDate: '',
    hasTwoFactorAuth: false,
  })

  const { hasTwoFactorAuth } = user

  useEffect(() => {
    async function fetchUser() {
      const [, user] = await accessUser()
      setUser(user)
    }
    fetchUser()
    // eslint-disable-next-line
  }, [reload])

  return (
    <>
      <div className="container pb-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center my-3">
          <h2 className="my-0">Profile</h2>
        </div>
        <div className="col px-0">
          <Details user={user} />
          <br />
          <TwoFactorAuth
            hasTwoFactorAuth={hasTwoFactorAuth}
            setReload={setReload}
          />
          <br />
          <DeleteAccount id={id} hasTwoFactorAuth={hasTwoFactorAuth} />
        </div>
      </div>
    </>
  )
}
