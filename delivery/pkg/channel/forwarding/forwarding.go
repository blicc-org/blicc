package forwarding

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

type Data struct {
	Url string
}

func Handle(data Data) interface{} {
	var d interface{}

	data.Url = strings.TrimSpace(data.Url)

	response, err := http.Get(data.Url)
	if err != nil {
		log.Println(err)
	}

	res, _ := ioutil.ReadAll(response.Body)
	json.Unmarshal([]byte(res), &d)
	return d
}
