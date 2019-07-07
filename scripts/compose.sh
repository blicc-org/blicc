#!/bin/sh
ssh -tt root@ip "cd /root && touch acme.json && chmod 600 acme.json"
scp -r /Path-to-project/blicc/docker-compose.yml root@ip:/root/
scp -r /Path-to-project/blicc/server/* root@ip:/root/
ssh -tt root@ip "docker-compose -f /root/docker-compose.yml up -d"
