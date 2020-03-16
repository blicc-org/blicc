#!/bin/sh
# initialize ubuntu server

## scp -r ./scripts/server.sh root@$IP:/root/init.sh
## ssh -t root@$IP "sh init.sh"

sudo apt -y update
sudo apt -y install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt -y update
apt-cache policy docker-ce
sudo apt -y install docker-ce

sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

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
