#!/bin/sh
# mount disks 

## list volumes
fdisk -l

## mount volume
mount /dev/sdb /root/db-data/

## create directories to work with docker mount
mkdir redis-data
mkdir postgres-data
mkdir mongo-data
