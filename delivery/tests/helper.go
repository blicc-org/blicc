package tests

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

func Equals(result string, expected string) bool {
	result = trim(result)
	expected = trim(expected)
	return result == expected
}

func trim(str string) string {
	str = strings.Replace(str, "\t", "", -1)
	str = strings.Replace(str, "\r", "", -1)
	str = strings.Replace(str, "\n", "", -1)
	str = strings.Replace(str, " ", "", -1)
	return str
}

func GetMock(path string) string {
	b, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Print(err)
	}

	str := string(b)
	return str
}

func GetMockApi() string {
	godotenv.Load(filepath.Join("../", ".env"))
	mockTestTarget := os.Getenv("MOCK_TEST_TARGET")
	return mockTestTarget
}

func TestDelivery(input string, includeToken bool) (string, error) {

	conn, err := getClientConn(includeToken)
	if err != nil {
		return "", err
	}

	err = conn.WriteMessage(websocket.TextMessage, []byte(input))
	if err != nil {
		return "", err
	}

	_, jsonData, err := conn.ReadMessage()
	if err != nil {
		return "", err
	}

	result := string(jsonData)
	conn.Close()

	return result, err
}

func getClientConn(includeToken bool) (*websocket.Conn, error) {
	err := godotenv.Load(filepath.Join("../", ".env"))
	if err != nil {
		fmt.Println("Error fetching variables from .env file", err)
	}

	apiTestTarget := os.Getenv("API_TEST_TARGET")
	deliveryTestTarget := os.Getenv("DELIVERY_TEST_TARGET_WEBSOCKET")
	adminMail := os.Getenv("ADMIN_MAIL")
	adminPassword := os.Getenv("ADMIN_PASSWORD")

	token := getAcessToken(adminMail, adminPassword, apiTestTarget)

	reqHeader := make(map[string][]string)
	if includeToken {
		reqHeader["cookie"] = []string{token}
	}

	conn, _, err := websocket.DefaultDialer.Dial(deliveryTestTarget+"/connection", reqHeader)
	if err != nil {
		fmt.Println(err)
	}

	return conn, err
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
