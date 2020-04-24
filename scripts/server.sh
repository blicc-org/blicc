#!/bin/sh
# initialize ubuntu server

apt -y update
apt -y install docker.io=19.03.8-0ubuntu1

## file for traefik to store certificates
touch acme.json
chmod 600 acme.json

## basic firewall setup
ufw allow OpenSSH
sudo ufw allow http
sudo ufw allow https
ufw allow 2377/tcp
ufw allow 7946/tcp
ufw allow 7946/udp
ufw allow 4789/udp

ufw --force enable
ufw status
