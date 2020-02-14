package cachekey

import (
	"bytes"
	"encoding/json"
	"strconv"
	"strings"

	"github.com/blicc-org/blicc/delivery/pkg/common/hash"
)

func Generate(channel *string, data *json.RawMessage) string {
	s := strings.Split(*channel, "/")
	id := s[len(s)-1]

	hash := strconv.Itoa(int(hash.Generate(string(*data))))

	var buffer bytes.Buffer
	buffer.WriteString(id)
	buffer.WriteString(hash)

	return buffer.String()
}
