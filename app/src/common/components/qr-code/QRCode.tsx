import React, { useState, useEffect } from 'react'
import qrcode from 'qrcode'

export function QRCode({ url }: any) {
  const [dataUrl, setDataUrl] = useState('')

  useEffect(() => {
    async function retrieveData() {
      setDataUrl(await qrcode.toDataURL(url))
    }
    url !== '' && retrieveData()
  }, [url])

  return (
    <div className="my-3">
      {url === '' ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <img src={dataUrl} alt="QR Code"></img>
      )}
    </div>
  )
}
