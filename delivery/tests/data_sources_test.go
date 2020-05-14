package tests

import (
	"testing"

	"github.com/blicc-org/blicc/delivery/tests/mocks"
)

func TestDataSources(t *testing.T) {
	input := mocks.DataSourceRequests[0].ToString()
	expected := mocks.DataSourceExpected[0].ToString()

	result, err := TestDelivery(input, true)
	if err != nil {
		t.Fatal(err)
	}

	if !Equals(result, expected) {
		t.Fatal("received:\n" + result + "\ndoes not equal expected:\n" + expected)
	}
}

func TestDataSourcesWrongChannel(t *testing.T) {
	input := `{"channel": "/wrong-channel/123456"}`

	_, err := TestDelivery(input, true)

	if err.Error() != "websocket: close 1003 (unsupported data)" {
		t.Fatal("connection did not close as expected")
	}
}

func TestDataSourcesWrongId(t *testing.T) {
	input := `{"channel": "/data-sources/wrongId123456"}`

	_, err := TestDelivery(input, true)

	if err.Error() != "websocket: close 1003 (unsupported data)" {
		t.Fatal("connection did not close as expected")
	}
}

func TestDataSourcesNoValidJWT(t *testing.T) {
	input := `{"channel": "/data-sources/123456"}`

	_, err := TestDelivery(input, false)

	if err.Error() != "websocket: bad handshake" {
		t.Fatal("connection did not close as expected")
	}
}
