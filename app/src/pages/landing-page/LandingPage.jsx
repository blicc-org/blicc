import React from 'react';
import Header from '../../components/header/Header';
import Headline from './Headline';
import Footer from '../../components/footer/Footer';

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="moveUnderNavBar" />
      <Headline />
      <Footer />
    </>
  );
}
