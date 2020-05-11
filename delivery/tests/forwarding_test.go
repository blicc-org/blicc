package tests

import (
	"fmt"
	"os"
	"strings"
	"testing"

	helper "github.com/blicc-org/blicc/delivery/pkg/common/tests"
)

func TestForwarding(t *testing.T) {
	pwd, _ := os.Getwd()
	mockApi := helper.GetMockApi()
	fmt.Println(mockApi)
	fmt.Println(pwd)

	input := helper.GetMock(pwd + "/mocks/request.json")
	fmt.Println(input)

	input = strings.Replace(input, "{{url}}", mockApi, 1)
	expected := helper.GetMock(pwd + "/mocks/expected.json")
	fmt.Println(expected)
	result, err := helper.TestDelivery(input)
	fmt.Println(result)

	if err != nil {
		t.Fatal(err)
	}

	if !helper.Equals(result, expected) {
		t.Fatal("received:\n" + result + "\ndoes not equal expected:\n" + expected)
	}
}
