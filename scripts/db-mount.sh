#!/bin/sh

# list volumes
fdisk -l

# mount volume
mount /dev/sdb /root/db-data/
