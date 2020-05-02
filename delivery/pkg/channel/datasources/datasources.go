package datasources

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/blicc-org/blicc/delivery/pkg/common/mongodbclient"

	"github.com/blicc-org/blicc/delivery/pkg/common/cachekey"
	"github.com/blicc-org/blicc/delivery/pkg/common/socketutil"
	"github.com/gorilla/websocket"
)

type Data struct {
	Request  Request
	Interval int32
	Query    string
}

type Request struct {
	Url     string
	Headers []Header
}

type Header struct {
	Key   string
	Value string
}

var client = &http.Client{Timeout: 10 * time.Second}

func Handle(conn *websocket.Conn, channel *string, updating map[string]bool) {
	s := strings.Split(*channel, "/")
	id := s[2]

	dataSource := mongodbclient.Get("data_sources", id)

	key := cachekey.Generate(channel, &dataSource.Data)

	socketutil.WriteCacheToConn(conn, &key)
	go run(conn, *channel, key, updating, dataSource.Data)
}

func run(conn *websocket.Conn, channel string, key string, updating map[string]bool, payload json.RawMessage) {
	var d Data
	err := json.Unmarshal(payload, &d)

	if err != nil {
		log.Printf("Error occurred by unmarshalling json: %s \n", err)
	}

	updateTicker := time.NewTicker(5000 * time.Millisecond)
	errors := make(chan error)

	if updating[channel] {
		go exec(conn, channel, key, d, errors)
	} else {
		updating[channel] = true
		for {
			var d Data
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
