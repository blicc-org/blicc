package mocks

import "encoding/json"

type Message struct {
	Channel string `json:"channel"`
}

func (m Message) ToString() string {
	mock, _ := json.Marshal(m)
	return string(mock)
}

type MessageWithBody struct {
	Channel string          `json:"channel"`
	Data    json.RawMessage `json:"data,omitempty"`
}

func (m MessageWithBody) ToString() string {
	mock, _ := json.Marshal(m)
	return string(mock)
}

var DataSourceRequests = []Message{
	Message{"/data-sources/123456"},
}

var DataSourceExpected = []MessageWithBody{
	MessageWithBody{
		"/data-sources/123456",
		[]byte(`{"datasets": [{ "data": "2020-02-14T20:51:00.840199+01:00", "label": "Date" }],"labels": ["Date"]}`),
	},
}

var ForwardingRequests = []MessageWithBody{
	MessageWithBody{
		"/forwarding/123456",
		[]byte(`{"request": {"url": "{{url}}", "headers": []}}`),
	},
}

var ForwardingExpected = []MessageWithBody{
	MessageWithBody{
		"/forwarding/123456",
		[]byte(`{
			"abbreviation": "CET",
			"client_ip": "193.175.2.18",
			"datetime": "2020-02-14T20:51:00.840199+01:00",
			"day_of_week": 5,
			"day_of_year": 45,
			"dst": false,
			"dst_from": null,
			"dst_offset": 0,
			"dst_until": null,
			"raw_offset": 3600,
			"timezone": "Europe/Berlin",
			"unixtime": 1581709860,
			"utc_datetime": "2020-02-14T19:51:00.840199+00:00",
			"utc_offset": "+01:00",
			"week_number": 7
		  }`),
	},
}
