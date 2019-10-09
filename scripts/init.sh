#!/bin/sh

# file for traefik to store certificates
touch acme.json
chmod 600 acme.json

# rsa keys for app authorization
openssl genrsa -out rsa.pem 2048
openssl rsa -in rsa.pem -outform PEM -pubout -out rsa_pub.pem
