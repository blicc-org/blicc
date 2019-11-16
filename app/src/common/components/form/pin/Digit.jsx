import React, { useRef, useEffect } from 'react'

export function Digit({ index, size, digit, setDigit, isFocused, setPos }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isFocused) ref.current.focus()
  })

  function onMouseDown() {
    setPos(parseInt(index))
  }

  function onChange({ target: t }) {
    const input = t.value.charAt(t.selectionStart - 1)
    if (/^(?:[0-9])$/.test(input) || input === '') {
      setDigit(input)
    }
  }

  function onKeyDown({ keyCode }) {
    if (keyCode === 8 || keyCode === 37) {
      setPos(prev => (prev - 1 > 0 ? prev - 1 : 0))
    } else if ((keyCode >= 48 && keyCode <= 57) || keyCode === 39) {
      setPos(prev => (prev + 1 < size ? prev + 1 : size))
    }
  }

  return (
    <input
      className="form-control"
      type="text"
      ref={ref}
      value={digit}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      autoComplete="off"
      required
    />
  )
}
