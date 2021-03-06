package socketutil

import (
	"encoding/json"
	"log"

	"github.com/blicc-org/blicc/delivery/pkg/common/redisclient"
	"github.com/gorilla/websocket"
)

type Result struct {
	Channel string      `json:"channel"`
	Data    interface{} `json:"data"`
}

func WriteCacheToConn(conn *websocket.Conn, key *string) error {
	cache, err := redisclient.Get(*key)

	if err != nil {
		log.Printf("Not yet in cache: %s \n", err)
		return err
	}

	err = conn.WriteMessage(websocket.TextMessage, cache)
	if err != nil {
		log.Printf("Error occurred by sending message back from cache: %s \n", err)
	}

	return err
}

func WriteToConnSetCache(conn *websocket.Conn, key *string, channel *string, data *interface{}) error {
	result := Result{Channel: *channel, Data: *data}

	marshaled, err := json.Marshal(result)
	if err != nil {
		log.Printf("Error occurred by marshalling json: %s \n", err)
		return err
	}

	err = conn.WriteMessage(websocket.TextMessage, marshaled)
	if err != nil {
		log.Printf("Error occured by sending data: %s \n", err)
		return err
	}

	err = redisclient.Set(*key, marshaled)
	if err != nil {
		log.Println(err)
	}

	return err
}
