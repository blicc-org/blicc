package rabbitmqclient

import (
	"fmt"
	"os"

	"github.com/streadway/amqp"
)

func Connect() {
	service := "rabbitmq"
	port := "5672"

	RABBITMQ_USERNAME := os.Getenv("RABBITMQ_USERNAME")
	RABBITMQ_PASSWORD := os.Getenv("RABBITMQ_PASSWORD")

	url := "amqp://" + RABBITMQ_USERNAME + ":" + RABBITMQ_PASSWORD + "@" + service + ":" + port

	conn, err := amqp.Dial(url)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("RabbitMQ connected")
	}
	defer conn.Close()

	ch, err := conn.Channel()
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
