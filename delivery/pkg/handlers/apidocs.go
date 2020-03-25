package handlers

import (
	"log"
	"net/http"
)

type ApiDocs struct {
	logger *log.Logger
}

func NewApiDocs(logger *log.Logger) *ApiDocs {
	return &ApiDocs{logger}
}

func (apiDocs *ApiDocs) ServeHTTP(rw http.ResponseWriter, r *http.Request) {

}
