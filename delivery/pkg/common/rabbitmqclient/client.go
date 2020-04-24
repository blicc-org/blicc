package rabbitmqclient

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/streadway/amqp"
)

var (
	Conn *amqp.Connection
)

func init() {
	Conn = newClient()
	cleanupHook()
}

func newClient() *amqp.Connection {
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

	return conn
}

func cleanupHook() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	signal.Notify(c, syscall.SIGTERM)
	signal.Notify(c, syscall.SIGKILL)
	go func() {
		<-c
		Conn.Close()
		os.Exit(0)
	}()
}
