#!/bin/sh
# initialize setup

## check if git, docker, docker-compose and yarn is installed
git --version >/dev/null || echo 'dependency missing: please install git'

## generate certificates into certs folder
mkdir -p certs
openssl genrsa -out ./certs/rsa.pem 2048
openssl rsa -in rsa.pem -outform PEM -pubout -out ./certs/rsa_pub.pem

## create default .env file
cp ./scripts/.env.default .env

## init subprojects
cd plugins && sh ./scripts/init.sh
