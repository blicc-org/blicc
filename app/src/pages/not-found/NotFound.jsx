import React from 'react';
import Header from '../../components/header/Header';
import NotFoundWarning from './NotFoundWarning';
import Footer from '../../components/footer/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="moveUnderNavBar" />
      <NotFoundWarning />
      <Footer />
    </>
  );
}
