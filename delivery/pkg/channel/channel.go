package channel

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/blicc-org/blicc/delivery/pkg/utils/hash"
	"github.com/gorilla/websocket"
)

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

			PublishCache(conn, &messageType, &key)
			go UpdatePublishSetCache(conn, messageType, key, payload)
		} else {
			conn.Close()
			log.Printf("wrong messageType: %d \n", messageType)
			break
		}
	}
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
