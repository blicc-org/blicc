import React, { useEffect, useState } from 'react'
import { TwoFactorAuthForm } from './TwoFactorAuthForm'
import { useApiEndpoint } from '../../hooks/useApiEndpoint'

export function TwoFactorAuth() {
  const [enable, requestSecret, ,] = useApiEndpoint('/two-factor-auth')
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
