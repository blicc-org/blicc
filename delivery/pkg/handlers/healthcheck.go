package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/blicc-org/blicc/delivery/pkg/common/information"

	"github.com/blicc-org/blicc/delivery/pkg/common/mongodbclient"
	"github.com/blicc-org/blicc/delivery/pkg/common/rabbitmqclient"
	"github.com/blicc-org/blicc/delivery/pkg/common/redisclient"
	"go.mongodb.org/mongo-driver/bson"
)

type healthcheck struct{}

func Healthcheck() *healthcheck {
	return &healthcheck{}
}

func (hc *healthcheck) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	mongodb := mongodbclient.Status()
	redis := redisclient.Status()
	rabbitmq := rabbitmqclient.Status()
	ipAddress, _ := information.GetIpAddress()

	status := bson.M{"mongodb": mongodb, "redis": redis, "rabbitmq": rabbitmq, "ipAddress": ipAddress}

	if mongodb && redis && rabbitmq {
		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(status)
	} else {
		w.WriteHeader(http.StatusServiceUnavailable)
		json.NewEncoder(w).Encode(status)
	}
}
