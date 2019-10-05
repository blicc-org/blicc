import React, { useState, useRef, useEffect } from 'react'
import './PinInput.scss'

export function Digit({ digit, setDigit, isFocused, setPos }) {
  const ref = useRef(null)
  useEffect(() => {
    if (isFocused) ref.current.focus()
  })

  return (
    <input
      className="form-control"
      type="text"
      ref={ref}
      value={digit}
      onChange={({ target: t }) => {
        const input = t.value.charAt(t.selectionStart - 1)
        if (/^(?:[0-9])$/.test(input) || input === '') {
          setDigit(input)
        }
      }}
      autoComplete="off"
      required
    />
  )
}

export function PinInput({}) {
  const [pos, setPos] = useState(0)
  const [pin, setPin] = useState({
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  })
  
  return (
    <div className="input-group mb-3 pin-input">
      {Object.keys(pin).map((key, index) => {
        return (
          <Digit
            key={key}
            digit={pin[key]}
            setDigit={value => {
              setPin(prev => {
                return { ...prev, [key]: value }
              })
            }}
            setPos={setPos}
            isFocused={index === pos}
          />
        )
      })}
    </div>
  )
}
