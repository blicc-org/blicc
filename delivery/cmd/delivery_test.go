package main

import (
	"os"
	"path/filepath"
	"testing"

	helper "github.com/blicc-org/blicc/delivery/pkg/common/tests"

	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

func TestStart(t *testing.T) {
	godotenv.Load(filepath.Join("../", ".env"))

	apiTestTarget := os.Getenv("API_TEST_TARGET")
	deliveryTestTarget := os.Getenv("DELIVERY_TEST_TARGET")
	adminMail := os.Getenv("ADMIN_MAIL")
	adminPassword := os.Getenv("ADMIN_PASSWORD")

	token := helper.GetAcessToken(adminMail, adminPassword, apiTestTarget)

	reqHeader := make(map[string][]string)
	reqHeader["cookie"] = []string{token}

	ws, _, err := websocket.DefaultDialer.Dial(deliveryTestTarget+"/connection", reqHeader)
	if err != nil {
		t.Fatalf("%v", err)
	}

	defer ws.Close()
}
