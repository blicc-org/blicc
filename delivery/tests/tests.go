package tests

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

var (
	API_TEST_TARGET                = ""
	DELIVERY_TEST_TARGET_WEBSOCKET = ""
	ADMIN_MAIL                     = ""
	ADMIN_PASSWORD                 = ""
	MOCK_TEST_TARGET               = ""
)

func init() {
	err := godotenv.Load(filepath.Join("../", ".env"))
	if err != nil {
		fmt.Println("Error fetching variables from .env file", err)
	}

	API_TEST_TARGET = os.Getenv("API_TEST_TARGET")
	DELIVERY_TEST_TARGET_WEBSOCKET = os.Getenv("DELIVERY_TEST_TARGET_WEBSOCKET")
	ADMIN_MAIL = os.Getenv("ADMIN_MAIL")
	ADMIN_PASSWORD = os.Getenv("ADMIN_PASSWORD")
	MOCK_TEST_TARGET = os.Getenv("MOCK_TEST_TARGET")

	fmt.Println("API_TEST_TARGET", API_TEST_TARGET)
	fmt.Println("DELIVERY_TEST_TARGET_WEBSOCKET", DELIVERY_TEST_TARGET_WEBSOCKET)
	fmt.Println("ADMIN_MAIL", ADMIN_MAIL)
	fmt.Println("MOCK_TEST_TARGET", MOCK_TEST_TARGET)
}
