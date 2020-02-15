package forwarding

import (
	"os"
	"strings"
	"testing"

	helper "github.com/blicc-org/blicc/delivery/pkg/common/tests"
)

func TestEndpoint(t *testing.T) {
	pwd, _ := os.Getwd()
	mockApi := helper.GetMockApi()

	input := helper.GetMock(pwd + "/mocks/request.json")
	input = strings.Replace(input, "{{url}}", mockApi, 1)
	expected := helper.GetMock(pwd + "/mocks/expected.json")
	result, err := helper.TestDelivery(input)

	if err != nil {
		t.Fatal(err)
	}

	if !helper.Equals(result, expected) {
		t.Fatal("received:\n" + result + "\ndoes not equal expected:\n" + expected)
	}

}
