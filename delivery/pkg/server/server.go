package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/blicc-org/blicc/delivery/pkg/common/mongodbclient"
	"go.mongodb.org/mongo-driver/bson"

	"github.com/blicc-org/blicc/delivery/pkg/common/apidocs"
	"github.com/blicc-org/blicc/delivery/pkg/common/rabbitmqclient"

	"github.com/blicc-org/blicc/delivery/pkg/channel"
	"github.com/blicc-org/blicc/delivery/pkg/common/flags"
	"github.com/blicc-org/blicc/delivery/pkg/middleware/auth"
	"github.com/blicc-org/blicc/delivery/pkg/middleware/logging"
)

func serveChannels(mux *http.ServeMux) {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		channel.ListenAndServe(w, r)
	})
	mux.Handle("/connection", auth.Middleware(handler))
}

func servePublicFolder(mux *http.ServeMux) {
	handler := http.FileServer(http.Dir("public"))
	mux.Handle("/", logging.Middleware(handler))
}

func Start() {
	apidocs.Generate()
	rabbitmqclient.Connect()
	mongodbclient.Set("data_sources", bson.M{"id": "1", "value": "some value"})
	dataSource := mongodbclient.Get("data_sources", "1")
	fmt.Println("nais")
	str := fmt.Sprintf("%v", dataSource)
	fmt.Println(str)
	var x interface{} = []int{1, 2, 3}
	str = fmt.Sprintf("%v", x)
	fmt.Println(str)

	logger := log.New(os.Stdout, "delivery: ", log.LstdFlags)

	mux := http.NewServeMux()

	serveChannels(mux)
	servePublicFolder(mux)

	port := flags.Instance().Port

	s := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		Handler:      mux,
		ErrorLog:     logger,
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	go func() {
		err := s.ListenAndServe()
		if err != nil {
			log.Fatal(err)
		} else {
			fmt.Printf("Server is listening on port %d ...\n", port)
		}
	}()

	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, os.Kill)

	sig := <-sigChan
	log.Println("Received termination, shutdown server after finishing all current requests...", sig)

	tc, err := context.WithTimeout(context.Background(), 30*time.Second)
	if err != nil {
		log.Fatal(err)
	}

	s.Shutdown(tc)
}
