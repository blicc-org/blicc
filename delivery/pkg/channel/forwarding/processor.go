package forwarding

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

func Process(data Data) interface{} {
	var d interface{}

	data.Request.Url = strings.TrimSpace(data.Request.Url)

	req, err := http.NewRequest("GET", data.Request.Url, nil)
	if err != nil {
		log.Println(err)
	}

	for _, header := range data.Request.Headers {
		req.Header.Set(header.Key, header.Value)
	}

	response, err := client.Do(req)
	if err != nil {
		log.Println(err)
	}

	res, _ := ioutil.ReadAll(response.Body)
	json.Unmarshal([]byte(res), &d)
	return d
}
