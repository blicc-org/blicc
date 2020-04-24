package mongodbclient

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	DB     string
	Ctx    context.Context
	Client *mongo.Client
)

func init() {
	DB = "db"
	Ctx = context.Background()
	Client = newClient()
	cleanupHook()
}

func newClient() *mongo.Client {
	GO_ENV := os.Getenv("GO_ENV")
	MONGODB_USERNAME := os.Getenv("MONGODB_USERNAME")
	MONGODB_PASSWORD := os.Getenv("MONGODB_PASSWORD")

	host := "mongo"
	port := "27017"

	if GO_ENV == "development" {
		host = "localhost"
	}

	uri := "mongodb://" + MONGODB_USERNAME + ":" + MONGODB_PASSWORD + "@" + host + ":" + port

	client, err := mongo.Connect(Ctx, options.Client().ApplyURI(uri))
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("MongoDB connected")
	}

	return client
}

func cleanupHook() {

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, syscall.SIGTERM)
	signal.Notify(c, syscall.SIGKILL)
	go func() {
		<-c
		Client.Disconnect(Ctx)
		os.Exit(0)
	}()
}
