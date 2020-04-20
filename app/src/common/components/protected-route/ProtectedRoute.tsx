import React, { useContext, ReactElement } from 'react'
import { AppContext } from '../../context'
import { Route, Redirect } from 'react-router-dom'

export function ProtectedRoute({
  component: Component,
  role = 'user',
  ...rest
}: any): ReactElement {
  const [appState] = useContext(AppContext)
  const { loggedIn, role: expectedRole } = appState

  if (role === 'admin' && role !== expectedRole)
    return (
      <Route
        {...rest}
        render={(): ReactElement => <Redirect to="/not-found" />}
      />
    )

  return (
    <Route
      {...rest}
      render={(props): ReactElement =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}
