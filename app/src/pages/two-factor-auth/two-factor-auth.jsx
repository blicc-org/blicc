import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import axios from 'axios'
import { API_URL } from '../../config'

export function TwoFactorAuth() {
  const [url, setUrl] = useState('')
  useEffect(() => {
    async function fetchURL() {
      const {
        data: { url },
      } = await axios.get(`${API_URL}/tokens`)
      console.log(url)
      const image = await QRCode.toDataURL(url)
      console.log(image)
      setUrl(image)
    }

    sessionStorage.setItem('test', 'Sheeesh')

    fetchURL()
  }, [])

  return (
    <>
      <img src={url}></img>
    </>
  )
}
