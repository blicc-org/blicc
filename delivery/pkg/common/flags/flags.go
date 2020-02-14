package flags

import (
	"flag"
	"sync"
)

type Flags struct {
	Port      uint
	CertsPath string
}

var once sync.Once

var instance Flags

func Instance() Flags {
	once.Do(func() {
		instance = Flags{80, "certs"}
		flag.UintVar(&instance.Port, "p", instance.Port, "Port the server listens on")
		flag.StringVar(&instance.CertsPath, "c", instance.CertsPath, "Path to certificates")
		flag.Parse()
	})
	return instance
}
