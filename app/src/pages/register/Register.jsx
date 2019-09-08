import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Header } from '../../components/header/Header'
import { RegisterForm } from './RegisterForm'
import { Footer } from '../../components/footer/Footer'
import { API_URL } from '../../config'
import { useApiEndpoint } from '../../common/hooks/useApiEndpoint'
import { useSession } from '../../common/hooks/useSession'
import { RegisterService } from './RegisterService'
import { ToastContext } from '../../common/context/ToastContext'
import statusCode from 'http-status-codes'

export function Register() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  })

  const [createUser, , ,] = useApiEndpoint(`${API_URL}/users`)
  const [onRegister, setOnRegister] = useState(false)
  const [, showToast] = useContext(ToastContext)
  const [login] = useSession()

  async function register() {
    if (
      RegisterService.isName(user.firstName) &&
      RegisterService.isName(user.lastName) &&
      RegisterService.isEmail(user.email) &&
      RegisterService.isPassword(user.password) &&
      user.password === user.confirm
    ) {
      const [status] = await createUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      })
      if (status === statusCode.CREATED) {
        setOnRegister(true)
        await login(user.email, user.password)
      } else if (status === statusCode.CONFLICT) {
        showToast('Conflict', 'The given email already exists.')
      } else {
        showToast('Register error', 'The registration process failed.')
      }
    }
  }

  return (
    <>
      {onRegister && <Redirect to="/dashboards" />}
      <Header />
      <RegisterForm user={user} setUser={setUser} register={register} />
      <Footer />
    </>
  )
}
