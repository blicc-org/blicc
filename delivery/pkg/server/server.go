package server

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/blicc-org/blicc/delivery/pkg/middleware/auth"
	"github.com/blicc-org/blicc/delivery/pkg/middleware/logging"
	"github.com/blicc-org/blicc/delivery/pkg/route/supplier"
	"github.com/blicc-org/blicc/delivery/pkg/utils/flags"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
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

func connectToDB() {
	GO_ENV := os.Getenv("GO_ENV")
	MONGODB_PASSWORD := os.Getenv("MONGODB_PASSWORD")

	user := "api"
	host := "mongo"
	port := "27017"

	if GO_ENV == "development" {
		host = "localhost"
	}

	uri := "mongodb://" + user + ":" + MONGODB_PASSWORD + "@" + host + ":" + port

	client, err := mongo.NewClient(options.Client().ApplyURI(uri))

	if err != nil {
		fmt.Printf("Error: %s\n", err)
	}

	ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(100*time.Millisecond))
	defer cancel()

	err = client.Connect(ctx)

	if err != nil {
		fmt.Printf("Error 1: %s\n", err)
	}

	defer client.Disconnect(ctx)
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		fmt.Printf("Error 2: %s\n", err)
	}

	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		fmt.Printf("Error 3: %s\n", err)
	}
	fmt.Println(databases)
}

func Start() {
	connectToDB()

	serveSupplier()
	servePublicFolder()

	port := flags.Instance().Port

	fmt.Printf("Server is listening on port %d ...\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}
