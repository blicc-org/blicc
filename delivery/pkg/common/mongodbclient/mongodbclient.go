package mongodbclient

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DataSource struct {
	Id           string          `json:"id"`
	Title        string          `json:"title"`
	Description  string          `json:"description"`
	UserId       string          `json:"userId"`
	CreationDate string          `json:"creationDate"`
	Data         json.RawMessage `json:"data"`
}

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

func Get(name string, id string) (DataSource, error) {
	var dataSource DataSource

	filter := bson.M{"id": id}
	err := Client.Database(DB).Collection(name).FindOne(Ctx, filter).Decode(&dataSource)

	return dataSource, err
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

func Populate() {

	seed := DataSource{
		Id:           "123456",
		Title:        "Time",
		Description:  "description...",
		UserId:       "123456",
		CreationDate: "2020-05-14T10:32:46.243Z",
		Data: []byte(`{
			"request": { "url": "https://mock.blicc.org/time", "headers": [] },
			"query": "{labels: ['Date'], datasets: [{label: 'Date', data: datetime}]}"
		  }`),
	}

	Set("data_sources", "123456", seed)
}
