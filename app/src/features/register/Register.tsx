import React, { useState, ReactElement } from 'react'
import { Redirect } from 'react-router-dom'
import { RegisterForm } from './RegisterForm'
import { useEndpoint, useLogin, useToast } from '../../common/hooks'
import { RegisterService } from './RegisterService'
import statusCode from 'http-status-codes'

export function Register(): ReactElement {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  })

  const [createUser, , ,] = useEndpoint('/users')
  const [redirect, setRedirect] = useState('')
  const showToast = useToast()
  const login = useLogin()

  async function register(): Promise<void> {
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
        await login(user.email, user.password)
        setRedirect('/dashboards')
      } else if (status === statusCode.CONFLICT) {
        showToast('Conflict', 'The given email already exists.', 'warning')
      } else {
        showToast(
          'Register error',
          'The registration process failed.',
          'danger'
        )
      }
    }
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <RegisterForm user={user} setUser={setUser} register={register} />
    </>
  )
}
