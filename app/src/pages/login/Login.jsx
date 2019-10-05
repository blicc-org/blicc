import React, { useState, useContext } from 'react'
import { Header } from '../../components/header/Header'
import { LoginPassword } from './LoginPassword'
import { Footer } from '../../components/footer/Footer'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import { Redirect } from 'react-router-dom'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [appState] = useContext(AppContext)
  const [login] = useSession()

  return (
    <>
      {appState.loggedIn && <Redirect to="/dashboards" />}
      <Header />
      <LoginPassword
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        login={login}
      />
      <Footer />
    </>
  )
}
