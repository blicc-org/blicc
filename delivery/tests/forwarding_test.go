package tests

import (
	"fmt"
	"os"
	"strings"
	"testing"
)

func TestForwarding(t *testing.T) {
	pwd, _ := os.Getwd()
	mockApi := GetMockApi()
	fmt.Println(mockApi)
	fmt.Println(pwd)

	input := GetMock(pwd + "/mocks/request.json")
	fmt.Println(input)

	input = strings.Replace(input, "{{url}}", mockApi, 1)
	expected := GetMock(pwd + "/mocks/expected.json")
	fmt.Println(expected)
	result, err := TestDelivery(input)
	fmt.Println(result)

	if err != nil {
		t.Fatal(err)
	}

	if !Equals(result, expected) {
		t.Fatal("received:\n" + result + "\ndoes not equal expected:\n" + expected)
	}
}
