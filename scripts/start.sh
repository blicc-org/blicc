#!/bin/sh
# build and run

## build and run docker compose
docker-compose up -d --build

## deploy plugins into redis
for ((;;)); do curl -s http://localhost > /dev/null && break; sleep 1; done && yarn --cwd 'plugins' deploy
