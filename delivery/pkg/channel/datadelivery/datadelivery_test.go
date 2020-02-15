package datadelivery

import (
	"testing"

	helper "github.com/blicc-org/blicc/delivery/pkg/common/tests"
)

func TestEndpoint(t *testing.T) {
	mockApi := helper.GetMockApi()

	input := `{"channel":"/data-delivery/123456","data":{"url":"` + mockApi + `","query":"{labels: ['time'], datasets: [{label: 'time', data: [datetime]}]}","interval":5000}}`
	expected := `{"channel":"/data-delivery/123456","data":{"datasets":[{"data":["2020-02-14T20:51:00.840199+01:00"],"label":"time"}],"labels":["time"]}}`
	result, err := helper.TestDelivery(input)

	if err != nil {
		t.Fatal(err)
	}

	if result != expected {
		t.Fatal("expected:\n" + expected + "\ndoes not equal:\n" + result)
	}

}
