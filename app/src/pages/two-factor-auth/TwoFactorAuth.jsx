import React, { useEffect, useState } from 'react'
import { TwoFactorAuthForm } from './TwoFactorAuthForm'
import { API_ORIGIN } from '../../config/env'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'

export function TwoFactorAuth() {
  const [enable, requestSecret, ,] = useApiEndpoint(
    `${API_ORIGIN}/two-factor-auth`
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
