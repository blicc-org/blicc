package tests

import (
	"os"
	"strings"
	"testing"
)

func TestForwarding(t *testing.T) {
	pwd, _ := os.Getwd()
	mockApi := GetMockApi()

	input := GetMock(pwd + "/mocks/forwarding_request.json")
	input = strings.Replace(input, "{{url}}", mockApi, 1)
	expected := GetMock(pwd + "/mocks/forwarding_expected.json")
	result, err := TestDelivery(input, true)

	if err != nil {
		t.Fatal(err)
	}

	if !Equals(result, expected) {
		t.Fatal("received:\n" + result + "\ndoes not equal expected:\n" + expected)
	}
}
