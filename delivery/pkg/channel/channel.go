package channel

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/blicc-org/blicc/delivery/pkg/channel/datasources"
	"github.com/blicc-org/blicc/delivery/pkg/channel/forwarding"
	"github.com/gorilla/websocket"
)

var CLOSE_UNSUPPORTED = 1003

type Payload struct {
	Channel string          `json:"channel"`
	Data    json.RawMessage `json:"data,omitempty"`
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
	updating := make(map[string]bool)
	data := make(map[string]json.RawMessage)

	for {
		messageType, jsonData, err := conn.ReadMessage()
		if err != nil {
			log.Println("Closing connection due to error: ", err)
			close := conn.CloseHandler()
			close(CLOSE_UNSUPPORTED, "Wrong input")
			return
		}

		if messageType == websocket.TextMessage {
			log.Println("Successful message type text message!")

			var p Payload
			json.Unmarshal(jsonData, &p)

			if _, ok := updating[p.Channel]; !ok {
				updating[p.Channel] = false
			}

			data[p.Channel] = p.Data

			switch c := strings.Split(p.Channel, "/")[1]; c {
			case "data-sources":
				err := datasources.Handle(conn, &p.Channel, updating)
				if err != nil {
					log.Println("Closing connection due to error: ", err)
					close := conn.CloseHandler()
					close(CLOSE_UNSUPPORTED, "Wrong input")
					return
				}
			case "forwarding":
				forwarding.Handle(conn, &p.Channel, &p.Data)
			default:
				log.Println("Closing connection due to no matching channel")
				close := conn.CloseHandler()
				close(CLOSE_UNSUPPORTED, "Wrong channel")
				return
			}
		} else {
			log.Println("Closing connection due to wrong messageType: ", messageType)
			close := conn.CloseHandler()
			close(CLOSE_UNSUPPORTED, "Wrong message type")
			return
		}
	}
}
