package server

import (
	"fmt"
	"net/http"

	"github.com/blicc-org/blicc/delivery/pkg/middleware/auth"
	"github.com/blicc-org/blicc/delivery/pkg/middleware/logging"
	"github.com/blicc-org/blicc/delivery/pkg/route/supplier"
	"github.com/blicc-org/blicc/delivery/pkg/utils/connect"
	"github.com/blicc-org/blicc/delivery/pkg/utils/flags"
	"github.com/blicc-org/blicc/delivery/pkg/utils/generatedocs"
)

func serveSupplier() {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		supplier.Route(w, r)
	})
	http.Handle("/connection", auth.Middleware(handler))
}

func servePublicFolder() {
	handler := http.FileServer(http.Dir("public"))
	http.Handle("/", logging.Middleware(handler))
}

func Start() {
	generatedocs.GenerateDocs()
	connect.ConnectToMongoDB()

	serveSupplier()
	servePublicFolder()

	port := flags.Instance().Port

	fmt.Printf("Server is listening on port %d ...\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}
