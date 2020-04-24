package mongodbclient

import (
	"fmt"

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
