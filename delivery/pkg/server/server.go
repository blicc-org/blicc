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
	"github.com/blicc-org/blicc/delivery/pkg/common/mongodbclient"
	"github.com/blicc-org/blicc/delivery/pkg/common/rabbitmqclient"
	"github.com/blicc-org/blicc/delivery/pkg/handlers"
	"github.com/blicc-org/blicc/delivery/pkg/middleware"
	"github.com/go-chi/chi"
	mw "github.com/go-chi/chi/middleware"
	"github.com/rs/cors"
)

func Start() {
	appOrigin := os.Getenv("APP_ORIGIN")

	apidocs.Generate()
	rabbitmqclient.UpdateDatabase()
	mongodbclient.Populate()

	logger := log.New(os.Stdout, "delivery: ", log.LstdFlags)

	router := chi.NewRouter()

	corsConfig := cors.Options{
		AllowedOrigins:   []string{appOrigin},
		AllowCredentials: true,
		Debug:            false,
	}

	router.Use(mw.GetHead)
	router.Use(cors.New(corsConfig).Handler)
	router.Use(middleware.Logging)

	router.Get("/*", http.FileServer(http.Dir("public")).ServeHTTP)
	router.Get("/health-check", handlers.Healthcheck(logger).ServeHTTP)

	router.Route("/connection", func(router chi.Router) {
		router.Use(middleware.NewPermission([]string{"user", "developer", "admin"}).Handler)
		router.Get("/", handlers.Connection(logger).ServeHTTP)
	})

	port := flags.Instance().Port

	s := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		Handler:      router,
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
