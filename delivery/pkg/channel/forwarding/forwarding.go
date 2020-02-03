package forwarding

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/blicc-org/blicc/delivery/pkg/utils/cachekey"
	"github.com/blicc-org/blicc/delivery/pkg/utils/socketutil"
	"github.com/gorilla/websocket"
)

type Data struct {
	Url string
}

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

	response, err := http.Get(data.Url)
	if err != nil {
		log.Println(err)
	}

	res, _ := ioutil.ReadAll(response.Body)
	json.Unmarshal([]byte(res), &d)
	return d
}
