package channel

import (
	"encoding/json"
	"log"
	"strings"

	"github.com/blicc-org/blicc/delivery/pkg/channel/datadelivery"
	"github.com/blicc-org/blicc/delivery/pkg/channel/forwarding"
	"github.com/blicc-org/blicc/delivery/pkg/utils/redisclient"
	"github.com/gorilla/websocket"
)

type Payload struct {
	Channel string          `json:"channel"`
	Data    json.RawMessage `json:"data"`
}

type Result struct {
	Channel string      `json:"channel"`
	Data    interface{} `json:"data"`
}

func PublishCache(conn *websocket.Conn, messageType *int, key *string) {
	cache, err := redisclient.Get(*key)

	if err != nil {
		log.Printf("Not yet in cache: %s \n", err)
		return
	}

	err = conn.WriteMessage(*messageType, cache)
	if err != nil {
		log.Printf("Error occurred by sending message back from cache: %s \n", err)
	}
}

func UpdatePublishSetCache(conn *websocket.Conn, messageType int, key string, payload Payload) {
	log.Println("Fetch from api and set the cache")

	d := fetchAndProcessData(payload)
	result := Result{Channel: payload.Channel, Data: d}

	marshaled, err := json.Marshal(result)
	if err != nil {
		log.Printf("Error occurred by marshalling json: %s \n", err)
	}

	err = conn.WriteMessage(messageType, marshaled)
	if err != nil {
		log.Printf("Error occured by sending data: %s \n", err)
		return
	}

	err = redisclient.Set(key, marshaled)
	if err != nil {
		log.Println(err)
	}
}

func fetchAndProcessData(payload Payload) interface{} {
	var d interface{}

	if strings.Contains(payload.Channel, "/data-delivery") {
		var data datadelivery.Data
		err := json.Unmarshal(payload.Data, &data)
		if err != nil {
			log.Printf("Error occurred by unmarshalling json: %s \n", err)
		}
		return datadelivery.Handle(data)
	}

	if strings.Contains(payload.Channel, "/forwarding") {
		var data forwarding.Data
		err := json.Unmarshal(payload.Data, &data)
		if err != nil {
			log.Printf("Error occurred by unmarshalling json: %s \n", err)
		}
		return forwarding.Handle(data)
	}

	return d
}
