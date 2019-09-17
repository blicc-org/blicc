FROM golang:latest

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY ./src /app

RUN go build -o main .

EXPOSE 8080

CMD ["/app/main"]
