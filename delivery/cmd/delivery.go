package main

import "github.com/blicc-org/blicc/delivery/pkg/server"

func main() {
	var PORT = 80
	server.Start(PORT)
}
