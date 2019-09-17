package main

import (
	"fmt"
	"net/http"
)

func main() {
	const PORT = 8080
	fmt.Printf("Starting server ...")
	http.HandleFunc("/", HelloServer)
	http.ListenAndServe(fmt.Sprintf(":%d", PORT), nil)
}

func HelloServer(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World!!!!!")
}
