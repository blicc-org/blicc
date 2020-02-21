#!/bin/sh

# rsa keys for app authorization
openssl genrsa -out rsa.pem 2048
openssl rsa -in rsa.pem -outform PEM -pubout -out rsa_pub.pem
