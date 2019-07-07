import React from 'react';
import Header from '../../components/header/Header';
import LoginForm from './LoginForm';
import Footer from '../../components/footer/Footer';

export default function Login() {
  return (
    <>
      <Header />
      <div className="moveUnderNavBar" />
      <LoginForm />
      <Footer />
    </>
  );
}
