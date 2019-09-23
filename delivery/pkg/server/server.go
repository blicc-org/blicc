package server

import (
	"os"
	"log"
	"fmt"
	"net/http"

	"github.com/blicc-org/blicc/delivery/pkg/middleware/logging"
)

func servePublicFolder(){

	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
  	fmt.Println(dir)

	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", logging.Middleware(fs))
}

func Start(port int) {
	servePublicFolder()
	fmt.Printf("Server is listening on port %d ...\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}
