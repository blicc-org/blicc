FROM golang:1.13-alpine

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

RUN go build -o main .

COPY ./src /app

EXPOSE 80

CMD ["/app/main"]
