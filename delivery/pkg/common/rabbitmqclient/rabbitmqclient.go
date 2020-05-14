package rabbitmqclient

import (
	"encoding/json"
	"fmt"

	"github.com/blicc-org/blicc/delivery/pkg/common/mongodbclient"
	"github.com/google/uuid"
)

type DataSource struct {
	Id             string          `json:"id"`
	Title          string          `json:"title"`
	Description    string          `json:"description"`
	UserId         string          `json:"userId"`
	PersistData    bool            `json:"persistData"`
	FetchFrequency int32           `json:"fetchFrequency"`
	CreationDate   string          `json:"creationDate"`
	Data           json.RawMessage `json:"data"`
}

var dataSourceQueue = "data_source"

func UpdateDatabase() {
	ch, err := Conn.Channel()
	if err != nil {
		fmt.Println(err)
	}

	var uniqueConsuerId = uuid.New().String()

	messages, err := ch.Consume(
		dataSourceQueue,
		uniqueConsuerId,
		false,
		false,
		false,
		false,
		nil,
	)

	if err != nil {
		fmt.Println(err)
	}

	go func() {
		fmt.Println("Rabbitmq: waiting for messages to arrive...")
		var dataSource DataSource

		for msg := range messages {
			fmt.Printf("Received a message: %s\n", msg.Body)
			json.Unmarshal(msg.Body, &dataSource)
			mongodbclient.Set("data_sources", dataSource.Id, dataSource)
			msg.Ack(false)
		}
	}()
}

func Status() bool {
	ch, err := Conn.Channel()
	if err != nil {
		fmt.Println("health check rabbitmq messed shit up")
		fmt.Println(err)
	}

	_, err = ch.QueueInspect(dataSourceQueue)
	return err == nil
}
