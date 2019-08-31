import React, { useState } from 'react'
import Header from '../../components/header/Header'
import RegisterForm from './RegisterForm'
import Footer from '../../components/footer/Footer'
import { API_URL } from '../../config'
import { useApiEndpoint } from '../../util/useApiEndpoint'
import { FormValidation } from '../../util/FormValidation'

export default function Register() {
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
      FormValidation.isName(user.firstName) &&
      FormValidation.isName(user.lastName) &&
      FormValidation.isEmail(user.email) &&
      FormValidation.isPassword(user.password) &&
      user.password === user.confirm
    ) {
      console.log('create user')
      delete user.confirm
      const [isCreated] = await createUser(user)
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
