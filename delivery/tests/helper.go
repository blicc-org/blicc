package tests

import (
	"bytes"
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/websocket"
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
	token := getAcessToken(ADMIN_MAIL, ADMIN_PASSWORD)

	reqHeader := make(map[string][]string)
	if includeToken {
		reqHeader["cookie"] = []string{token}
	}

	conn, _, err := websocket.DefaultDialer.Dial(DELIVERY_TEST_TARGET_WEBSOCKET+"/connection", reqHeader)
	if err != nil {
		fmt.Println(err)
	}

	return conn, err
}

func getAcessToken(adminMail string, adminPassword string) string {
	var jsonStr = []byte(`{"email":"` + adminMail + `", "password":"` + adminPassword + `"}`)

	req, err := http.NewRequest("POST", API_TEST_TARGET+"/tokens", bytes.NewBuffer(jsonStr))
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
