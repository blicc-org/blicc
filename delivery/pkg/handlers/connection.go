package handlers

import (
	"log"
	"net/http"
)

type Connection struct {
	logger *log.Logger
}

func NewConnection(logger *log.Logger) *Connection {
	return &Connection{logger}
}

func (conn *Connection) ServeHTTP(rw http.ResponseWriter, r *http.Request) {

}
