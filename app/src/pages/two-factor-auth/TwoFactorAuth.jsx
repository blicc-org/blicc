import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Header } from '../../components/header/Header'
import { Footer } from '../../components/footer/Footer'
import { QRCode } from '../../components/qr-code/QRCode'
import { API_URL } from '../../config'

export function TwoFactorAuth() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    async function fetchURL() {
      const {
        data: { otpAuthUrl },
      } = await axios.get(`${API_URL}/tokens`)
      setUrl(otpAuthUrl)
    }

    fetchURL()
  }, [])

  return (
    <>
      <Header />
      <QRCode url={url}></QRCode>
      <Footer />
    </>
  )
}
