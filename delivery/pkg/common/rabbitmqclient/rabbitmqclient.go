package rabbitmqclient

import (
	"fmt"
)

func UpdateDatabase() {
	ch, err := Conn.Channel()
	if err != nil {
		fmt.Println(err)
	}
	defer ch.Close()

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
		for d := range messages {
			fmt.Printf("Received a message: %s\n", d.Body)
		}
	}()

}

func Status() bool {
	return true
}
