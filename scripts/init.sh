#!/bin/sh
# initialize setup

## generate certificates into certs folder
mkdir -p certs
openssl genrsa -out ./certs/rsa.pem 2048
openssl rsa -in rsa.pem -outform PEM -pubout -out ./certs/rsa_pub.pem

## create default .env file
cp ./scripts/.env.default .env
