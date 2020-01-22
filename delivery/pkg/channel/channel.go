package channel

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/blicc-org/blicc/delivery/pkg/channel/datadelivery"
	"github.com/blicc-org/blicc/delivery/pkg/channel/forwarding"
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

		if err != nil {
			log.Println(err)
			return
		}

		var payload Payload
		json.Unmarshal([]byte(jsonData), &payload)

		d := channelSwitch(payload)
		result := Result{Channel: payload.Channel, Data: d}
		marshaled, _ := json.Marshal(result)

		if err := conn.WriteMessage(messageType, marshaled); err != nil {
			log.Println(err)
			return
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
