package handlers

import (
	"log"
	"net/http"

	"github.com/blicc-org/blicc/delivery/pkg/channel"
)

type connection struct {
	logger *log.Logger
}

func Connection(logger *log.Logger) *connection {
	return &connection{logger}
}

func (conn *connection) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	channel.ListenAndServe(w, r)
}
