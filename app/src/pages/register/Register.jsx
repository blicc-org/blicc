import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import { RegisterForm } from './RegisterForm'
import { Footer } from '../../components/footer/Footer'
import { API_URL } from '../../config'
import { useApiEndpoint } from '../../common/hooks/useApiEndpoint'
import { useSession } from '../../common/hooks/session/useSession'
import { RegisterService } from './RegisterService'
import { AppContext, INITIAL_APP_STATE } from '../../common/context/AppContext'

export function Register() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  })

  const [createUser, , ,] = useApiEndpoint(`${API_URL}/users`)

  const [appState, setAppState] = useContext(AppContext)
  const [login] = useSession()

  setAppState(INITIAL_APP_STATE)

  async function register() {
    if (
      RegisterService.isName(user.firstName) &&
      RegisterService.isName(user.lastName) &&
      RegisterService.isEmail(user.email) &&
      RegisterService.isPassword(user.password) &&
      user.password === user.confirm
    ) {
      const [isCreated] = await createUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      })
      if (isCreated === 201) {
        await login(user.email, user.password)
      }
    }
  }
  return (
    <>
      {appState.loggedIn && <Redirect to="/dashboards" />}
      <Header />
      <RegisterForm user={user} setUser={setUser} register={register} />
      <Footer />
    </>
  )
}
