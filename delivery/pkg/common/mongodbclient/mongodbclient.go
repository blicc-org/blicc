package mongodbclient

import (
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
)

func Set(name string, document interface{}) {

	db := Client.Database(DB)

	collection := db.Collection(name)

	_, err := collection.InsertOne(Ctx, document)
	if err != nil {
		fmt.Println(err)
	}
}

func Get(name string, id string) interface{} {
	db := Client.Database(DB)

	collection := db.Collection(name)

	return collection.FindOne(Ctx, bson.M{"id": id})
}
