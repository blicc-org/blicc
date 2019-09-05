import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import { RegisterForm } from './RegisterForm'
import { Footer } from '../../components/footer/Footer'
import { API_URL } from '../../config'
import { useApiEndpoint } from '../../common/hooks/useApiEndpoint'
import { RegisterService } from './RegisterService'
import { AppContext } from '../../common/context/AppContext'

export function Register() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  })

  const [createUser, , ,] = useApiEndpoint(`${API_URL}/users`)
  const [createSession, , ,] = useApiEndpoint(`${API_URL}/sessions`)

  const [appState, setAppState] = useContext(AppContext)

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
        const [isAccepted] = await createSession({
          email: user.email,
          password: user.password,
        })
        if (isAccepted === 202) {
          setAppState({
            ...appState,
            loggedIn: true,
            firstName: user.firstName,
            lastName: user.lastName,
          })
        }
      }
    }
  }
  return (
    <>
      {appState.loggedIn && <Redirect to="/dashboard" />}
      <Header />
      <RegisterForm user={user} setUser={setUser} register={register} />
      <Footer />
    </>
  )
}
