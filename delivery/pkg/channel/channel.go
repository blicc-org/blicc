package channel

import (
	"bytes"
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
		if err != nil {
			log.Println(err)
		}

		var payload Payload
		json.Unmarshal([]byte(jsonData), &payload)

		key := generateCacheKey(payload.Channel, jsonData)
		log.Println("00")
		publishCache(conn, messageType, key)
		log.Println("01")
		go updatePublishSetCache(conn, messageType, key, payload)
		log.Println("02")
	}
}

func publishCache(conn *websocket.Conn, messageType int, key string) {
	cache, err := redisclient.Get(key)
	if err == nil {
		log.Println("Take from Cache")
		if err := conn.WriteMessage(messageType, cache); err != nil {
			log.Println(err)
			return
		}
	}
}

func updatePublishSetCache(conn *websocket.Conn, messageType int, key string, payload Payload) {
	log.Println("Fetch from api and set the cache")
	d := channelSwitch(payload)
	log.Println("1")
	result := Result{Channel: payload.Channel, Data: d}
	log.Println("2")
	marshaled, _ := json.Marshal(result)
	log.Println("3")
	if err := conn.WriteMessage(messageType, marshaled); err != nil {
		log.Println("4")
		log.Println(err)
		return
	}
	log.Println("5")
	err := redisclient.Set(key, marshaled)
	log.Println("6")
	if err != nil {
		log.Println(err)
	}
	log.Println("7")
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

func generateCacheKey(channel string, data []byte) string {
	s := strings.Split(channel, "/")
	log.Println(channel)
	id := s[len(s)-1]
	hash := strconv.Itoa(int(hash.Generate(string(data))))
	log.Println(hash)
	var buffer bytes.Buffer
	buffer.WriteString(id)
	buffer.WriteString(hash)
	return buffer.String()
}
