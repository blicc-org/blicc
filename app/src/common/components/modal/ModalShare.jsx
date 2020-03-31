import React from 'react'
import { Mail } from 'react-feather'
import { APP } from '../../../config'
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  RedditShareButton,
  RedditIcon,
  TumblrShareButton,
  TumblrIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'
import './ModalShare.scss'

export function ModalShare({ cancel, id, title }) {
  const shareUrl = `${APP.ORIGIN}/d/${id}`
  function copy() {
    const el = document.createElement('textarea')
    el.value = shareUrl
    el.setAttribute('readonly', '')
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Share</h5>
            <button
              title="Close modal"
              onClick={cancel}
              type="button"
              className="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row text-center share">
              <div className="col col-sm-2 col-4">
                <FacebookShareButton url={shareUrl} quote={title}>
                  <FacebookIcon size={60} round />
                </FacebookShareButton>
                <br />
                <small className="text-muted">Facebook</small>
              </div>
              <div className="col col-sm-2 col-4">
                <TwitterShareButton url={shareUrl} quote={title}>
                  <TwitterIcon size={60} round />
                </TwitterShareButton>
                <br />
                <small className="text-muted">Twitter</small>
              </div>

              <div className="col col-sm-2 col-4">
                <TumblrShareButton url={shareUrl} quote={title}>
                  <TumblrIcon size={60} round />
                </TumblrShareButton>
                <br />
                <small className="text-muted">Tumblr</small>
              </div>
              <div className="col col-sm-2 col-4">
                <RedditShareButton url={shareUrl} quote={title}>
                  <RedditIcon className="reddit-color" size={60} round />
                </RedditShareButton>
                <br />
                <small className="text-muted">Reddit</small>
              </div>
              <div className="col col-sm-2 col-4">
                <WhatsappShareButton url={shareUrl} quote={title}>
                  <WhatsappIcon size={60} round />
                </WhatsappShareButton>
                <br />
                <small className="text-muted">Whatsapp</small>
              </div>
              <div className="col col-sm-2 col-4">
                <EmailShareButton url={shareUrl} quote={title}>
                  <div className="email-button">
                    <Mail />
                  </div>
                </EmailShareButton>
                <br />
                <small className="text-muted">Email</small>
              </div>
            </div>
            <br />
            <div class="input-group mb-3">
              <input
                class="form-control copy-clipboard"
                type="text"
                value={shareUrl}
                onFocus={(evt) => evt.target.select()}
                readonly
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  onClick={copy}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
