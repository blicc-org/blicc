import React from 'react'
import { Upload } from 'react-feather'
import { APP } from '../../../config'
import { Image } from '../../../common/components/ui'
import { useMobile } from '../../../common/hooks'

export function ProfilePicture({ user }) {
  const isMobile = useMobile()
  return (
    <tr>
      <td className="py-3 pr-3">
        <Image
          width={isMobile ? 120 : 160}
          height={isMobile ? 120 : 160}
          src={`${APP.ORIGIN}/profile-picture/${user.id}.jpg?dimension=640x640`}
        />
      </td>
      <td>
        <p>
          <b>Profile picture</b>
        </p>
        <button className="btn btn-outline-secondary mr-2 mb-2" type="button">
          <Upload size={16} /> {' Upload'}
        </button>
        <button className="btn btn-danger mb-2" type="button">
          Remove
        </button>
        <p>
          <small className="text-muted">
            The profile picture should have at least 640x640 pixels.
          </small>
        </p>
      </td>
    </tr>
  )
}
