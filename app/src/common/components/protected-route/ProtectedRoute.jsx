import React, { useContext } from 'react'
import { AppContext } from '../../context'
import { Route, Redirect } from 'react-router-dom'

export function ProtectedRoute({ component: Component, ...rest }) {
  const [appState] = useContext(AppContext)
  const { loggedIn } = appState

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}
