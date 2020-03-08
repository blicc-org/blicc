FROM golang:1.13

WORKDIR /root

COPY go.mod .
RUN go mod download

COPY . .

RUN go get -v github.com/cespare/reflex
RUN go install github.com/cespare/reflex

HEALTHCHECK CMD wget --quiet --tries=1 --spider 127.0.0.1:8080 || exit 1

EXPOSE 8080

CMD ["reflex", "-r", "\\.go$", "-s", "--", "sh", "-c", "go run ./cmd/delivery.go -p 8080"]
