package datadelivery

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/blicc-org/blicc/delivery/pkg/utils/cachekey"
	"github.com/blicc-org/blicc/delivery/pkg/utils/socketutil"
	"github.com/gorilla/websocket"
	"github.com/jmespath/go-jmespath"
)

type Data struct {
	Url      string
	Interval int32
	Query    string
}

var httpWithResponse = &http.Client{Timeout: 10 * time.Second}

func Handle(conn *websocket.Conn, channel *string, payload *json.RawMessage) {
	key := cachekey.Generate(channel, payload)

	socketutil.WriteCacheToConn(conn, &key)
	go publish(conn, *channel, key, *payload)
}

func publish(conn *websocket.Conn, channel string, key string, payload json.RawMessage) {
	var data Data
	err := json.Unmarshal(payload, &data)

	if err != nil {
		log.Printf("Error occurred by unmarshalling json: %s \n", err)
	}

	var d = process(data)
	socketutil.WriteToConnSetCache(conn, &key, &channel, &d)
}

func process(data Data) interface{} {
	var d interface{}

	data.Url = strings.TrimSpace(data.Url)

	log.Println(data.Interval)

	response, err := httpWithResponse.Get(data.Url)
	if err != nil {
		log.Printf("Error occurred by fetching the data from external api: %s \n", err)
	}

	res, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Printf("Error occurred by reading external api response: %s \n", err)
	}

	err = json.Unmarshal([]byte(res), &d)
	if err != nil {
		log.Printf("Error occurred by unmarshalling external api response: %s \n", err)
	}

	queried, err := jmespath.Search(data.Query, d)
	if err != nil {
		log.Printf("Error occurred by querying response with given query: %s \n", err)
	}
	return queried
}
