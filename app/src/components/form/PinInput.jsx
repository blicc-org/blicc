import React, { useState } from 'react'

export function Pin({ num, setNum }) {
  return (
    <input
      id="inlineFormInputGroupUsername"
      className="form-control"
      type="text"
      pattern="[0-9]*"
      onChange={e => setNum(e.target.validity.valid ? e.target.value : num)}
      value={num}
      maxLength="1"
      autocomplete="off"
      required
    />
  )
}

export function PinInput({ pin, setPin }) {
  const init = new Array(6)
  init.fill('')
  const [array, setArray] = useState(init)

  return (
    <div className="input-group mb-3">
      {array.map(() => {
        return <Pin pos={1} num={array} setNum={setArray} />
      })}
    </div>
  )
}
