package channel

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/blicc-org/blicc/delivery/pkg/channel/datadelivery"
	"github.com/blicc-org/blicc/delivery/pkg/channel/forwarding"
	"github.com/blicc-org/blicc/delivery/pkg/utils/hash"
	"github.com/blicc-org/blicc/delivery/pkg/utils/redisclient"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

type Payload struct {
	Channel string          `json:"channel"`
	Data    json.RawMessage `json:"data"`
}

type Result struct {
	Channel string      `json:"channel"`
	Data    interface{} `json:"data"`
}

func reader(conn *websocket.Conn) {
	for {
		messageType, jsonData, err := conn.ReadMessage()

		hash := generateHash(jsonData)

		cache, err := redisclient.Get(hash)
		if err == nil {
			log.Println("Take from Cache")
			if err := conn.WriteMessage(messageType, cache); err != nil {
				log.Println(err)
				return
			}
		} else {
			log.Println("Set to Cache")
			var payload Payload
			json.Unmarshal([]byte(jsonData), &payload)

			d := channelSwitch(payload)
			result := Result{Channel: payload.Channel, Data: d}
			marshaled, _ := json.Marshal(result)

			if err := conn.WriteMessage(messageType, marshaled); err != nil {
				log.Println(err)
				return
			}

			err = redisclient.Set(hash, marshaled)
			if err != nil {
				log.Println(err)
			}
		}
	}
}

func channelSwitch(payload Payload) interface{} {
	var d interface{}

	if strings.Contains(payload.Channel, "/data-delivery") {
		var data datadelivery.Data
		json.Unmarshal(payload.Data, &data)
		return datadelivery.Handle(data)
	}

	if strings.Contains(payload.Channel, "/forwarding") {
		var data forwarding.Data
		json.Unmarshal(payload.Data, &data)
		return forwarding.Handle(data)
	}

	return d
}

func ListenAndServe(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	log.Println("Connection established...")
	reader(ws)
}

func generateHash(p []byte) string {
	return strconv.Itoa(int(hash.Generate(string(p))))
}
