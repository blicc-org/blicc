package mongodbclient

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Set(collectionName string, id string, document interface{}) {

	db := Client.Database(DB)
	opts := options.FindOneAndUpdate().SetUpsert(true)
	filter := bson.D{primitive.E{Key: "id", Value: id}}

	var newDocument = bson.D{primitive.E{Key: "$set", Value: document}}
	var updatedDocument bson.M

	err := db.Collection(collectionName).FindOneAndUpdate(Ctx, filter, newDocument, opts).Decode(&updatedDocument)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			fmt.Println("ErrNoDocuments: the filter did not match any documents")
			return
		}
		log.Fatal(err)
	}
}

func Get(name string, id string) interface{} {
	collection := Client.Database(DB).Collection(name)

	return collection.FindOne(Ctx, bson.M{"id": id})
}

func Status() bool {
	ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()

	err := Client.Ping(ctx, nil)
	if err != nil {
		return false
	}
	return true
}
