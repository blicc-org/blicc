package tests

import (
	"strings"
	"testing"

	"github.com/blicc-org/blicc/delivery/tests/mocks"
)

func TestForwarding(t *testing.T) {
	input := mocks.ForwardingRequests[0].ToString()
	input = strings.Replace(input, "{{url}}", MOCK_TEST_TARGET, 1)
	expected := mocks.ForwardingExpected[0].ToString()
	result, err := TestDelivery(input, true)

	if err != nil {
		t.Fatal(err)
	}

	if !Equals(result, expected) {
		t.Fatal("received:\n" + result + "\ndoes not equal expected:\n" + expected)
	}
}
