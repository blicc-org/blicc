import React from 'react'
import qrcode from 'qrcode'

export function QRCode(url) {
  const dataUrl = qrcode.toDataURL(url)

  return <img src={dataUrl}></img>
}
