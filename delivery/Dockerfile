FROM golang:latest

COPY ./src .
WORKDIR /go
RUN go build -o main .

EXPOSE 8080

CMD ["/go/main"]
