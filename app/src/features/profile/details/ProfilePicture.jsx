import React from 'react'
import { Upload } from 'react-feather'
import { API } from '../../../config'
import { Image } from '../../../common/components/ui'
import { useMobile, useModal } from '../../../common/hooks'
import { ProfilePictureModal } from './ProfilePictureModal'

export function ProfilePicture({ user }) {
  const isMobile = useMobile()
  const length = isMobile ? 120 : 160
  const [showModal, hideModal] = useModal(() => (
    <ProfilePictureModal
      userId={user.id}
      cancel={() => hideModal()}
      submit={hideModal}
    />
  ))

  return (
    <tr>
      <td className="py-3 pr-3">
        {user.id ? (
          <Image
            width={length}
            height={length}
            src={`${API.ORIGIN}/profile-pictures/${user.id}.jpg`}
          />
        ) : (
          <div style={{ width: length, height: length }} />
        )}
      </td>
      <td>
        <p>
          <b>Profile picture</b>
        </p>
        <button
          className="btn btn-outline-secondary mr-2 mb-2"
          type="button"
          onClick={showModal}
        >
          <Upload size={16} /> {' Upload'}
        </button>
        <button className="btn btn-danger mb-2" type="button">
          Remove
        </button>
        <p>
          <small className="text-muted">
            Upload a profile picture as either jpeg or png.
          </small>
        </p>
      </td>
    </tr>
  )
}
