package forwarding

import (
	"encoding/json"
	"log"

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
	go run(conn, *channel, key, *payload)
}

func run(conn *websocket.Conn, channel string, key string, payload json.RawMessage) {
	var data Data
	err := json.Unmarshal(payload, &data)

	if err != nil {
		log.Printf("Error occurred by unmarshalling json: %s \n", err)
	}

	var d = Process(data)
	socketutil.WriteToConnSetCache(conn, &key, &channel, &d)
}
