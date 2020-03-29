#!/bin/sh
# setup servers

## list volumes
fdisk -l

## mount volume
mount /dev/sdb /srv

## create directories to work with docker mount
mkdir redis-data postgres-data mongo-data prometheus-data rabbitmq-data

# login to docker registry
docker login registry.example.com
