package rabbitmqclient

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

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
		time.Sleep(3 * time.Second)
		fmt.Println("trying to connect...")
		conn = newClient()
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
		fmt.Println("closing rabbitmq connection...")
		Conn.Close()
		os.Exit(0)
	}()
}
