package datadelivery

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"testing"

	helper "github.com/blicc-org/blicc/delivery/pkg/common/tests"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

func TestEndpoint(t *testing.T) {
	godotenv.Load(filepath.Join("../../../", ".env"))

	mockTestTarget := os.Getenv("MOCK_TEST_TARGET")

	fmt.Println(mockTestTarget)

	conn := helper.GetClientConn()

	err := conn.WriteMessage(websocket.TextMessage, []byte(`{"channel":"/data-delivery/123456","data":{"url":"`+mockTestTarget+`","query":"{labels: ['time'], datasets: [{label: 'time', data: [datetime]}]}","interval":5000}}`))
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
