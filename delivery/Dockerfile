FROM golang:1.13-alpine

WORKDIR /app

COPY go.mod .

RUN go mod download

COPY . .
COPY ./cmd/public ./public

RUN go build -o main ./cmd/delivery.go

EXPOSE 80

CMD ["/app/main"]
