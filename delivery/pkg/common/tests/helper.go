package helper

import (
	"bytes"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

func GetMockApi() string {
	godotenv.Load(filepath.Join("../../../", ".env"))
	mockTestTarget := os.Getenv("MOCK_TEST_TARGET")
	return mockTestTarget
}

func TestDelivery(input string, expected string) (string, error) {

	conn := getClientConn()
	err := conn.WriteMessage(websocket.TextMessage, []byte(input))
	if err != nil {
		log.Printf("Error occured by testing: %s \n", err)
	}

	_, jsonData, err := conn.ReadMessage()
	if err != nil {
		log.Printf("Error occured by testing: %s \n", err)
	}

	result := string(jsonData)
	conn.Close()

	return result, err
}

func getClientConn() *websocket.Conn {
	godotenv.Load(filepath.Join("../../../", ".env"))

	apiTestTarget := os.Getenv("API_TEST_TARGET")
	deliveryTestTarget := os.Getenv("DELIVERY_TEST_TARGET")
	adminMail := os.Getenv("ADMIN_MAIL")
	adminPassword := os.Getenv("ADMIN_PASSWORD")

	token := getAcessToken(adminMail, adminPassword, apiTestTarget)

	reqHeader := make(map[string][]string)
	reqHeader["cookie"] = []string{token}

	conn, _, err := websocket.DefaultDialer.Dial(deliveryTestTarget+"/connection", reqHeader)
	if err != nil {
		fmt.Println(err)
	}

	return conn
}

func getAcessToken(adminMail string, adminPassword string, apiTestTarget string) string {
	var jsonStr = []byte(`{"email":"` + adminMail + `", "password":"` + adminPassword + `"}`)

	req, err := http.NewRequest("POST", apiTestTarget+"/tokens", bytes.NewBuffer(jsonStr))
	if err != nil {
		fmt.Println(err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
	}

	cookie := resp.Header.Get("Set-Cookie")
	s := strings.Split(cookie, ";")
	token := s[0]

	return token
}
