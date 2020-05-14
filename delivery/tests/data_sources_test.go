package tests

import (
	"os"
	"testing"
)

func TestDataSources(t *testing.T) {
	pwd, _ := os.Getwd()

	input := GetMock(pwd + "/mocks/data_sources_request.json")
	expected := GetMock(pwd + "/mocks/data_sources_expected.json")
	result, err := TestDelivery(input)

	if err != nil {
		t.Fatal(err)
	}

	if !Equals(result, expected) {
		t.Fatal("received:\n" + result + "\ndoes not equal expected:\n" + expected)
	}
}

func TestDataSourcesWrongChannel(t *testing.T) {
	input := `{"channel": "/wrong-channel/123456"}`

	_, err := TestDelivery(input)

	if err.Error() != "websocket: close 1006 (abnormal closure): unexpected EOF" {
		t.Fatal("connection did not close as expected")
	}
}
