package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/blicc-org/blicc/delivery/pkg/common/apidocs"
	"github.com/blicc-org/blicc/delivery/pkg/common/flags"
	"github.com/blicc-org/blicc/delivery/pkg/common/rabbitmqclient"
	"github.com/blicc-org/blicc/delivery/pkg/handlers"
	"github.com/blicc-org/blicc/delivery/pkg/middleware"
	"github.com/rs/cors"
)

func Start() {
	appOrigin := os.Getenv("APP_ORIGIN")

	apidocs.Generate()
	rabbitmqclient.UpdateDatabase()

	logger := log.New(os.Stdout, "delivery: ", log.LstdFlags)

	mux := http.NewServeMux()
	mux.Handle("/", http.FileServer(http.Dir("public")))
	mux.Handle("/health-check", handlers.Healthcheck())
	mux.Handle("/connection", handlers.Connection(logger))

	corsConfig := cors.Options{
		AllowedOrigins:   []string{appOrigin},
		AllowCredentials: true,
		Debug:            false,
	}

	wrappedMux := cors.New(corsConfig).Handler(middleware.Logging(middleware.Permission(mux)))

	port := flags.Instance().Port

	s := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		Handler:      wrappedMux,
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
