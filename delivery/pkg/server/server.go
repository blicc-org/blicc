package server

import (
	"fmt"
	"net/http"

	"github.com/blicc-org/blicc/delivery/pkg/common/apidocs"
	"github.com/blicc-org/blicc/delivery/pkg/common/mongoclient"

	"github.com/blicc-org/blicc/delivery/pkg/channel"
	"github.com/blicc-org/blicc/delivery/pkg/common/flags"
	"github.com/blicc-org/blicc/delivery/pkg/middleware/auth"
	"github.com/blicc-org/blicc/delivery/pkg/middleware/logging"
)

func serveChannels() {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		channel.ListenAndServe(w, r)
	})
	http.Handle("/connection", auth.Middleware(handler))
}

func servePublicFolder() {
	handler := http.FileServer(http.Dir("public"))
	http.Handle("/", logging.Middleware(handler))
}

func Start() {
	apidocs.Generate()
	mongoclient.Connect()

	serveChannels()
	servePublicFolder()

	port := flags.Instance().Port

	fmt.Printf("Server is listening on port %d ...\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}
