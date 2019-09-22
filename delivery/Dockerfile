FROM golang:1.13-alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY ./src /app

RUN go build -o main .

EXPOSE 80

CMD ["/app/main"]
