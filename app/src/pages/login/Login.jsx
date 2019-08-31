import React from 'react'
import { Header } from '../../components/header/Header'
import { LoginForm } from './LoginForm'
import { Footer } from '../../components/footer/Footer'

export function Login() {
  return (
    <>
      <Header />
      <LoginForm />
      <Footer />
    </>
  )
}
