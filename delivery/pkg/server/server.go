package server

import (
	"fmt"
	"net/http"

	"github.com/blicc-org/blicc/delivery/pkg/middleware/logging"
)

func apiDocsPage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Api Docs")
}

func routes(){
	http.Handle("/", logging.Middleware(http.HandlerFunc(apiDocsPage)))
}

func Start(port int) {
	routes()
	fmt.Printf("Server is listening on port %d ...\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}
