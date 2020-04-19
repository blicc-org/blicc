import React, { useState } from 'react'
import { LoginPassword } from './LoginPassword'
import { useLogin, useModal } from '../../common/hooks'
import { Redirect } from 'react-router-dom'
import { LoginTwoFactorAuth } from './LoginTwoFactorAuth'
import { MetaData } from '../../common/components/meta-data/MetaData'
import { WrongPasswordModal } from './WrongPasswordModal'
import './Login.scss'

const Steps = {
  PASSWORD: 'password',
  TWO_FACTOR_AUTH: 'two_factor_auth',
}

export function Login() {
  const [step, setStep] = useState(Steps.PASSWORD)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [redirect, setRedirect] = useState('')
  const [showModal, hideModal] = useModal(() => (
    <WrongPasswordModal
      cancel={() => {
        hideModal()
        setRedirect('/')
      }}
      submit={hideModal}
    />
  ))
  const login = useLogin(
    () => {
      setRedirect('/dashboards')
    },
    () => {
      showModal()
    }
  )

  async function loginHandler() {
    const hasTwoFactorAuth = await login(email, password)
    if (hasTwoFactorAuth) {
      setStep(Steps.TWO_FACTOR_AUTH)
    }
  }

  async function loginHandler2FA(e: any) {
    e.preventDefault()
    await login(email, password, token)
  }

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <MetaData
        title={'Login'}
        description={'Login to be able to view your private content.'}
        path={'/login'}
      />
      <div className="col-md-5 mx-auto py-5 my-5 text-center">
        {step === Steps.PASSWORD ? (
          <LoginPassword
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            login={loginHandler}
          />
        ) : (
          <LoginTwoFactorAuth login={loginHandler2FA} setToken={setToken} />
        )}
      </div>
    </>
  )
}
