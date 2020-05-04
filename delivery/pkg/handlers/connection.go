package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/blicc-org/blicc/delivery/pkg/channel"
	"github.com/gorilla/websocket"
)

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

type connection struct {
	logger *log.Logger
}

func Connection(logger *log.Logger) *connection {
	return &connection{logger}
}

func (conn *connection) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	userId := r.Context().Value("userId")
	fmt.Println(userId)
	if userId != nil {
		fmt.Println("yayyy!!!!")
	} else {
		fmt.Println("No wayyyy!!!!")
	}
	channel.ListenAndServe(w, r)
}
