import React, { useState } from 'react'
import { Header } from '../../components/header/Header'
import { RegisterForm } from './RegisterForm'
import { Footer } from '../../components/footer/Footer'
import { API_URL } from '../../config'
import { useApiEndpoint } from '../../common/hooks/useApiEndpoint'
import { RegisterService } from './RegisterService'

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

  async function register() {
    if (
      RegisterService.isName(user.firstName) &&
      RegisterService.isName(user.lastName) &&
      RegisterService.isEmail(user.email) &&
      RegisterService.isPassword(user.password) &&
      user.password === user.confirm
    ) {
      console.log('create user')
      const [isCreated] = await createUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      })
      if (isCreated === 201) {
        console.log('create session')
        const [isAccepted] = await createSession({
          email: user.email,
          password: user.password,
        })
        if (isAccepted === 202) {
          console.log('redirect')
        }
      }
    }
  }
  return (
    <>
      <Header />
      <RegisterForm user={user} setUser={setUser} register={register} />
      <Footer />
    </>
  )
}
