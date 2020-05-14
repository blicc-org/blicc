package mocks

import (
	"encoding/json"
)

type DataSourceRequest struct {
	Channel string `json:"channel"`
}

func (d DataSourceRequest) ToString() string {
	mock, _ := json.Marshal(d)
	return string(mock)
}

type DataSourceExpected struct {
	Channel string          `json:"channel"`
	Data    json.RawMessage `json:"data,omitempty"`
}

func (d DataSourceExpected) ToString() string {
	mock, _ := json.Marshal(d)
	return string(mock)
}

var Requests = []DataSourceRequest{
	DataSourceRequest{"/data-sources/123456"},
}

var Expected = []DataSourceExpected{
	DataSourceExpected{
		"/data-sources/123456",
		[]byte(`{"datasets": [{ "data": "2020-02-14T20:51:00.840199+01:00", "label": "Date" }],"labels": ["Date"]}`),
	},
}
