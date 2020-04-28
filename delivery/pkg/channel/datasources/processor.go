package datasources

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/jmespath/go-jmespath"
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

	if err != nil {
		log.Printf("Error occurred by fetching the data from external api: %s \n", err)
	}

	res, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Printf("Error occurred by reading external api response: %s \n", err)
	}

	err = json.Unmarshal([]byte(res), &d)
	if err != nil {
		log.Printf("Error occurred by unmarshalling external api response: %s \n", err)
	}

	queried, err := jmespath.Search(data.Query, d)
	if err != nil {
		log.Printf("Error occurred by querying response with given query: %s \n", err)
	}
	return queried
}
