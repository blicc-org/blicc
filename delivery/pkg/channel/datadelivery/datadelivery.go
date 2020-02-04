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

func Handle(conn *websocket.Conn, channel *string, updating map[string]bool, data map[string]json.RawMessage) {
	payload := data[*channel]
	key := cachekey.Generate(channel, &payload)

	socketutil.WriteCacheToConn(conn, &key)
	go run(conn, *channel, key, updating, data)
}

func run(conn *websocket.Conn, channel string, key string, updating map[string]bool, data map[string]json.RawMessage) {
	var d Data
	payload := data[channel]
	err := json.Unmarshal(payload, &d)

	if err != nil {
		log.Printf("Error occurred by unmarshalling json: %s \n", err)
	}

	updateTicker := time.NewTicker(time.Duration(d.Interval) * time.Millisecond)
	errors := make(chan error)

	if updating[channel] {
		go exec(conn, channel, key, d, errors)
	} else {
		updating[channel] = true
		for {
			var d Data
			payload := data[channel]
			err := json.Unmarshal(payload, &d)

			if err != nil {
				log.Printf("Error occurred by unmarshalling json: %s \n", err)
			}
			go exec(conn, channel, key, d, errors)
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

func exec(conn *websocket.Conn, channel string, key string, data Data, errors chan<- error) {
	log.Println("Update data on interval")
	var d = Process(data)
	err := socketutil.WriteToConnSetCache(conn, &key, &channel, &d)
	if err != nil {
		errors <- err
	}
}
