package channel

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/blicc-org/blicc/delivery/pkg/channel/datadelivery"
	"github.com/blicc-org/blicc/delivery/pkg/channel/forwarding"
	"github.com/blicc-org/blicc/delivery/pkg/utils/hash"
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

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		incomingOrigin := r.Header.Get("Origin")
		expectedOrigin := os.Getenv("APP_ORIGIN")

		if incomingOrigin == expectedOrigin {
			log.Printf("Upgrade to origin %s was successful! \n", incomingOrigin)
			return true
		} else {
			log.Printf("Origin %s is not allowed. Expected %s as origin. \n", incomingOrigin, expectedOrigin)
			return true
		}
	},
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

func reader(conn *websocket.Conn) {
	for {
		messageType, jsonData, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error occurred by reading incoming message!")
			log.Println(err)
		}

		if messageType == websocket.TextMessage {
			log.Println("Successful message type text message!")

			var payload Payload
			json.Unmarshal([]byte(jsonData), &payload)

			key := generateCacheKey(&payload.Channel, &jsonData)

			publishCache(conn, &messageType, &key)
			go updatePublishSetCache(conn, messageType, key, payload)
		} else {
			conn.Close()
			log.Printf("wrong messageType: %d \n", messageType)
			break
		}
	}
}

func publishCache(conn *websocket.Conn, messageType *int, key *string) {
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

func updatePublishSetCache(conn *websocket.Conn, messageType int, key string, payload Payload) {
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

func generateCacheKey(channel *string, data *[]byte) string {
	s := strings.Split(*channel, "/")
	id := s[len(s)-1]

	hash := strconv.Itoa(int(hash.Generate(string(*data))))

	var buffer bytes.Buffer
	buffer.WriteString(id)
	buffer.WriteString(hash)

	return buffer.String()
}
