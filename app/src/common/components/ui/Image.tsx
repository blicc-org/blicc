import React, { useState, ReactElement, useEffect, useRef } from 'react'
import statusCode from 'http-status-codes'
import { Image as Placeholder } from 'react-feather'
import { Loading } from './Loading'
import { lightgray } from '../../../Theme.scss'
import { useEndpoint, Accept } from '../../hooks'
import { API } from '../../../config'

const State = {
  LOADING: 0,
  SUCCESS: 1,
  ERROR: 2,
}

export function Image({ width, height, path }: any): ReactElement {
  const ref = useRef<HTMLImageElement>(null)
  const iconSize = 48
  const [state, setState] = useState(State.LOADING)
  const [, access] = useEndpoint(path, undefined, Accept.JPEG)

  useEffect(() => {
    async function getImgData() {
      const [status, data] = await access()
      if (status === statusCode.OK) {
        const reader = new FileReader()
        reader.onload = () => {
          if (ref.current) {
            ref.current.src =
              typeof reader.result === 'string' ? reader.result : ''
          }
        }
        reader.readAsDataURL(data)
        setState(State.SUCCESS)
      } else {
        setState(State.ERROR)
      }
    }
    getImgData()
  }, [])

  const style = {
    width,
    height,
    display: 'flex',
    outlineStyle: state === State.LOADING ? 'none' : 'solid',
    outlineWidth: '1px',
    outlineColor: lightgray,
  }

  return (
    <div style={style}>
      {state === State.LOADING && <Loading />}
      {state === State.ERROR && (
        <Placeholder
          size={iconSize}
          color={lightgray}
          style={{
            alignSelf: 'center',
            margin: 'auto',
          }}
        />
      )}
      {(state === State.LOADING || state === State.SUCCESS) && (
        <img
          ref={ref}
          alt=""
          width={width}
          height={height}
          style={{ display: state === State.LOADING ? 'none' : 'flex' }}
        />
      )}
    </div>
  )
}
