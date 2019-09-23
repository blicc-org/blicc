package main

import(
	"flag"
	"github.com/blicc-org/blicc/delivery/pkg/server"
)	

func main() {
	var port int
	flag.IntVar(&port, "p", 80, "Port the server listens on")
	flag.Parse()
	server.Start(port)
}
