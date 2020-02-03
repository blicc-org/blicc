package datadelivery

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/blicc-org/blicc/delivery/pkg/utils/cachekey"
	"github.com/blicc-org/blicc/delivery/pkg/utils/socketutil"
	"github.com/gorilla/websocket"
)

type Data struct {
	Url      string
	Interval int32
	Query    string
}

var httpWithResponse = &http.Client{Timeout: 10 * time.Second}

func Handle(conn *websocket.Conn, channel *string, payload *json.RawMessage, publisher map[string]bool) {
	key := cachekey.Generate(channel, payload)

	socketutil.WriteCacheToConn(conn, &key)
	go run(conn, *channel, key, *payload, publisher)
}

func run(conn *websocket.Conn, channel string, key string, payload json.RawMessage, publisher map[string]bool) {
	var data Data
	err := json.Unmarshal(payload, &data)

	if err != nil {
		log.Printf("Error occurred by unmarshalling json: %s \n", err)
	}

	updateTicker := time.NewTicker(time.Duration(data.Interval) * time.Millisecond)
	errors := make(chan error)

	if publisher[channel] {
		go runInterval(conn, channel, key, data, errors)
	} else {
		publisher[channel] = true
		for {
			go runInterval(conn, channel, key, data, errors)
			select {
			case err = <-errors:
				if strings.Contains(err.Error(), "close sent") {
					log.Printf("Closing live loop...")
					return
				}
			default:
			}
			<-updateTicker.C
		}
	}
}

func runInterval(conn *websocket.Conn, channel string, key string, data Data, errors chan<- error) {
	log.Println("Update data on interval")
	var d = Process(data)
	err := socketutil.WriteToConnSetCache(conn, &key, &channel, &d)
	if err != nil {
		errors <- err
	}
}
