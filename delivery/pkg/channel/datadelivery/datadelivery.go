package datadelivery

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/jmespath/go-jmespath"
)

type Data struct {
	Url   string
	Query string
}

func Handle(data Data) interface{} {
	var d interface{}

	data.Query = strings.Replace(data.Query, "`", "'", -1)
	response, err := http.Get(data.Url)
	if err != nil {
		log.Println(err)
	}

	res, _ := ioutil.ReadAll(response.Body)
	json.Unmarshal([]byte(res), &d)

	queried, err := jmespath.Search(data.Query, d)
	if err != nil {
		log.Fatal(err)
	}
	return queried
}
