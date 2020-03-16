#!/bin/sh
# mount disks 

## list volumes
fdisk -l

## mount volume
mount /dev/sdb /srv

## create directories to work with docker mount
mkdir redis-data postgres-data mongo-data
