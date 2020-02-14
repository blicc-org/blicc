package datadelivery

import (
	"log"
	"testing"

	helper "github.com/blicc-org/blicc/delivery/pkg/common/tests"
	"github.com/gorilla/websocket"
)

func TestEndpoint(t *testing.T) {
	conn := helper.GetClientConn()

	err := conn.WriteMessage(websocket.TextMessage, []byte(`{"channel":"/data-delivery/gx7hYTjq","data":{"url":"http://worldtimeapi.org/api/timezone/Europe/Berlin","query":"{labels: ['time'], datasets: [{label: 'time', data: [datetime]}]}","interval":5000}}`))
	if err != nil {
		log.Printf("Error occured by testing: %s \n", err)
	}

	_, jsonData, err := conn.ReadMessage()
	if err != nil {
		log.Printf("Error occured by testing: %s \n", err)
	}

	log.Println(string(jsonData))

	conn.Close()
}
