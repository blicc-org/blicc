import React from 'react'

export function MyPlugin({ data, onDataUpdate, settings, setSettings }) {
  onDataUpdate(() => {})

  return (
    <>
      <div style={settings}>Hello {JSON.stringify(data)}</div>
      <button onClick={() => setSettings({ color: 'red' })}>
        Click me to set settings
      </button>
    </>
  )
}
