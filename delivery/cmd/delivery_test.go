package main

import (
	"testing"
	"time"

	"github.com/blicc-org/blicc/delivery/pkg/server"
	"github.com/gorilla/websocket"
)

func TestStart(t *testing.T) {
	go server.Start()

	time.Sleep(5 * time.Second)

	// Connect to the server
	ws, _, err := websocket.DefaultDialer.Dial("http://localhost:8080/ws", nil)
	if err != nil {
		t.Fatalf("%v", err)
	}
	defer ws.Close()
}
