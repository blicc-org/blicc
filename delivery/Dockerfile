FROM golang:1.13-alpine

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY ./pkg /app

RUN go build -o main .

EXPOSE 80

CMD ["/app/main"]
