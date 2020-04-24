package mongodbclient

import (
	"fmt"
)

func Set(collectionName string, document interface{}) {

	db := Client.Database("db")

	collection := db.Collection(collectionName)

	_, err := collection.InsertOne(Ctx, document)
	if err != nil {
		fmt.Println(err)
	}
}
