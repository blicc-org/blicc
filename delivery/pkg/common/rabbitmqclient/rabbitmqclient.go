package rabbitmqclient

import (
	"encoding/json"
	"fmt"

	"github.com/blicc-org/blicc/delivery/pkg/common/mongodbclient"
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

func UpdateDatabase() {
	ch, err := Conn.Channel()
	if err != nil {
		fmt.Println(err)
	}
	// defer func() {
	// 	fmt.Println("closing rabbitmq channel...")
	// 	ch.Close()
	// }()

	messages, err := ch.Consume(
		"data_source", // queue
		"",            // consumer
		true,          // auto-ack
		false,         // exclusive
		false,         // no-local
		false,         // no-wait
		nil,           // args
	)

	if err != nil {
		fmt.Println(err)
	}

	go func() {
		fmt.Println("waiting for arriving messages...")

		for msg := range messages {
			fmt.Println("Arriving!!!")
			var dataSource DataSource
			json.Unmarshal(msg.Body, &dataSource)
			mongodbclient.Set("data_sources", dataSource.Id, dataSource)
			fmt.Printf("Received a message: %s\n", msg.Body)
		}
	}()
}

func Status() bool {
	return true
}
