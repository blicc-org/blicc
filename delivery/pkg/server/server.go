package server

import (
	"fmt"
	"net/http"

	"github.com/blicc-org/blicc/delivery/pkg/middleware/logging"
	"github.com/blicc-org/blicc/delivery/pkg/route/supplier"
)

func serveSupplier() {
	http.HandleFunc("/ws", supplier.Route)
}

func servePublicFolder() {
	fs := http.FileServer(http.Dir("public"))
	http.Handle("/", logging.Middleware(fs))
}

func Start(port int) {
	serveSupplier()
	servePublicFolder()
	fmt.Printf("Server is listening on port %d ...\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}
