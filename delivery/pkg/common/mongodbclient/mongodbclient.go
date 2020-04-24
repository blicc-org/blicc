package mongodbclient

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func Set(name string, document interface{}) {

	db := Client.Database(DB)

	item, err := db.Collection(name).InsertOne(Ctx, document)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(item)
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
