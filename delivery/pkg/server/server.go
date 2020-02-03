package server

import (
	"fmt"
	"net/http"

	"github.com/blicc-org/blicc/delivery/pkg/utils/apidocs"
	"github.com/blicc-org/blicc/delivery/pkg/utils/mongoclient"

	"github.com/blicc-org/blicc/delivery/pkg/channel"
	"github.com/blicc-org/blicc/delivery/pkg/middleware/auth"
	"github.com/blicc-org/blicc/delivery/pkg/middleware/logging"
	"github.com/blicc-org/blicc/delivery/pkg/utils/flags"
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
