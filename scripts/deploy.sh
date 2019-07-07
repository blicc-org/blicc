#!/bin/sh

# deploy a docker image
# $1: image name, $2: path to Dockerfile
docker build -t $1 $2
docker save -o ../docker/$1.tar $1
scp -r $PWD/../docker/$1.tar root@ip:/root/
ssh -tt root@ip "docker load --input /root/$1.tar"
ssh -tt root@ip "docker-compose -f /root/docker-compose.yml up -d --force-recreate"
