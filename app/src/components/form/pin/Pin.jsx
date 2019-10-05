import React, { useState } from 'react'
import { Digit } from './Digit'
import './Pin.scss'

export function Pin({ size, setPin }) {
  let pin = {}
  for (let i = 0; i < size; i++) {
    pin[i] = ''
  }

  const [pos, setPos] = useState(0)
  const [number, setNumber] = useState(pin)

  function setDigit(key, value) {
    setNumber(prev => {
      const tmp = { ...prev, [key]: value }
      setPin(
        Object.values(tmp).reduce((prev, item) => {
          return prev + item
        })
      )
      return tmp
    })
  }

  return (
    <div className="input-group mb-3 pin-input">
      {Object.keys(number).map((key, index) => {
        return (
          <Digit
            key={key}
            index={index}
            size={size}
            digit={number[key]}
            setDigit={value => setDigit(key, value)}
            setPos={setPos}
            isFocused={index === pos}
          />
        )
      })}
    </div>
  )
}
