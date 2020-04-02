package mongoclient

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func Connect() {
	GO_ENV := os.Getenv("GO_ENV")
	MONGODB_USERNAME := os.Getenv("MONGODB_USERNAME")
	MONGODB_PASSWORD := os.Getenv("MONGODB_PASSWORD")

	host := "mongo"
	port := "27017"

	if GO_ENV == "development" {
		host = "localhost"
	}

	uri := "mongodb://" + MONGODB_USERNAME + ":" + MONGODB_PASSWORD + "@" + host + ":" + port

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
