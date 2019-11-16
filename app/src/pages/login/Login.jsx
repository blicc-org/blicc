import React, { useState, useContext } from 'react'
import { LoginPassword } from './LoginPassword'
import { AppContext } from '../../common/context/AppContext'
import { useSession } from '../../common/hooks/useSession'
import { Redirect } from 'react-router-dom'
import { LoginTwoFactorAuth } from './LoginTwoFactorAuth'
import { MetaData } from '../../common/components/meta-data/MetaData'
import './Login.scss'

const Steps = {
  PASSWORD: 'password',
  TWO_FACTOR_AUTH: 'two_factor_auth',
}

export function Login() {
  const title = 'Login'
  const description = 'Login to be able to view your private content.'
  const path = '/login'

  const [step, setStep] = useState(Steps.PASSWORD)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [appState] = useContext(AppContext)
  const [login] = useSession()

  async function loginHandler() {
    const hasTwoFactorAuth = await login(email, password)
    if (hasTwoFactorAuth) {
      setStep(Steps.TWO_FACTOR_AUTH)
    }
  }

  async function loginHandler2FA(e) {
    e.preventDefault()
    await login(email, password, token)
  }

  return (
    <>
      {appState.loggedIn && <Redirect to="/dashboards" />}
      <MetaData title={title} description={description} path={path} />
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
