FROM golang:1.13-alpine

WORKDIR /app

COPY go.mod .

RUN go mod download

COPY . .

RUN go build -o bin/delivery ./cmd/delivery.go

EXPOSE 80

CMD ["/app/bin/delivery"]
