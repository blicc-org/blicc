package forwarding

import (
	"testing"

	helper "github.com/blicc-org/blicc/delivery/pkg/common/tests"
)

func TestEndpoint(t *testing.T) {
	mockApi := helper.GetMockApi()

	input := `{"channel":"/forwarding/123456","data":{"url":"` + mockApi + `"}}`
	expected := `{"channel":"/forwarding/123456","data":{"abbreviation":"CET","client_ip":"193.175.2.18","datetime":"2020-02-14T20:51:00.840199+01:00","day_of_week":5,"day_of_year":45,"dst":false,"dst_from":null,"dst_offset":0,"dst_until":null,"raw_offset":3600,"timezone":"Europe/Berlin","unixtime":1581709860,"utc_datetime":"2020-02-14T19:51:00.840199+00:00","utc_offset":"+01:00","week_number":7}}`
	result, err := helper.TestDelivery(input)

	if err != nil {
		t.Fatal(err)
	}

	if result != expected {
		t.Fatal("received:\n" + result + "\ndoes not equal expected:\n" + expected)
	}

}
