package main

import (
	"github.com/blicc-org/blicc/delivery/pkg/server"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	server.Start()
}
