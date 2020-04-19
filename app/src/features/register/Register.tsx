import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { RegisterForm } from './RegisterForm'
import { useApiEndpoint, useLogin, useToast } from '../../common/hooks'
import { RegisterService } from './RegisterService'
import statusCode from 'http-status-codes'

export function Register() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  })

  const [createUser, , ,] = useApiEndpoint('/users')
  const [redirect, setRedirect] = useState('')
  const showToast = useToast()
  const login = useLogin()

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
