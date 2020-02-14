package helper

import (
	"bytes"
	"fmt"
	"net/http"
	"strings"
)

func GetAcessToken(adminMail string, adminPassword string, apiTestTarget string) string {
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
	return s[0]
}
