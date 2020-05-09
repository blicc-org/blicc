import React, { useState, useEffect, ReactElement } from 'react'
import statusCode from 'http-status-codes'
import { useEndpoint } from '../../hooks'
import { Image } from '../ui'
import { API } from '../../../config'
import { Chart, List } from '../../interfaces'

export function SelectChartModal({ cancel, submit }: any): ReactElement {
  const maxNumberOfResults = 10
  const [list, setList] = useState<List<Chart>>()
  const [, access, ,] = useEndpoint('/charts')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const [status, data] = await access({
        params: {
          search: searchTerm,
          take: maxNumberOfResults,
        },
      })
      if (status === statusCode.OK) {
        setList({ total: data.total, list: data.charts })
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [searchTerm])

  function onSelect(event: any, slug: string, key: string): void {
    event.preventDefault()
    submit(slug + '/' + key)
  }

  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select a chart type</h5>
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
            <input
              className="form-control"
              type="text"
              placeholder="Like Pie Chart..."
              onChange={(evt): void => setSearchTerm(evt.target.value)}
            ></input>
            <div
              className="row pt-3"
              style={{ overflowY: 'scroll', height: '300px' }}
            >
              {list &&
                list.list.map((item) => (
                  <div key={item.id} className="col-sm-6 pb-4">
                    <a
                      href="/"
                      onClick={(evt): void =>
                        onSelect(evt, item.slug, item.key)
                      }
                    >
                      <Image
                        src={`${API.ORIGIN}/chart-thumbnails/${item.id}.jpg`}
                        width={200}
                        height={112.5}
                      />
                    </a>
                    <h5 className="pt-2">
                      <a
                        href="/"
                        onClick={(evt): void =>
                          onSelect(evt, item.slug, item.key)
                        }
                      >
                        {item.title}
                      </a>
                      <small className="text-muted">{` @${item.slug}`}</small>
                    </h5>
                  </div>
                ))}
            </div>
            <hr />
            <h6>
              Results <small>{`${list ? list.total : 0} found.`}</small>
            </h6>
          </div>
        </div>
      </div>
    </>
  )
}
