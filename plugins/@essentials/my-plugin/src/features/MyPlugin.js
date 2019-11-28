import React from 'react'

export function MyPlugin({ data, settings, setSettings }) {
  return (
    <>
      <div>Hello {JSON.stringify(data)}</div>
      <button onClick={() => setSettings()}>Click me to set settings</button>
    </>
  )
}
