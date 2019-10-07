import React, { useEffect, useState } from 'react'
import { TwoFactorAuthForm } from './TwoFactorAuthForm'
import { API_URL } from '../../config/env'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'

export function TwoFactorAuth() {
  const [enable, requestSecret, ,] = useApiEndpoint(
    `${API_URL}/two-factor-auth`
  )
  const [url, setUrl] = useState('')

  useEffect(() => {
    async function fetchChallengeUrl() {
      const [, { otpAuthUrl }] = await requestSecret()
      setUrl(otpAuthUrl)
    }
    fetchChallengeUrl()
    // eslint-disable-next-line
  }, [])

  return <TwoFactorAuthForm url={url} enable={enable} />
}
