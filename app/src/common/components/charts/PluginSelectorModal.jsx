import React from 'react'

export function PluginSelectorModal({ cancel, submit, plugins }) {
  return (
    <>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select a chart type</h5>
            <button onClick={cancel} type="button" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              type="text"
              placeholder="Like Pie Chart..."
            ></input>
            <div className="plugin-results">
              <ul>
                {plugins.map(({ name, path, bundle, description }) => (
                  <li key={path}>
                    <h4>{name}</h4>
                    <p>{bundle}</p>
                    <p>{description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={cancel}
              type="button"
              className="btn btn-outline-secondary"
            >
              Cancel
            </button>
            <button onClick={submit} type="button" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
