package main

import (
	"fmt"
	"net/http"
)

// "github.com/gorilla/websocket"
// "github.com/swaggest/go-asyncapi/spec"
// "github.com/swaggest/go-asyncapi/swgen/asyncapi"

func main() {
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "delivery!")
	}))
	http.ListenAndServe(":80", nil)
}
