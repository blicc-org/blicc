FROM golang:1.13

WORKDIR /root

COPY go.mod .

RUN go mod download

COPY . .

RUN go build -o main ./cmd/delivery.go

EXPOSE 80

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost/health-check || exit 1

CMD ["/root/main"]
