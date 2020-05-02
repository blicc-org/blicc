#!/bin/sh

RABBITMQ_USERNAME=$1
RABBITMQ_PASSWORD=$2

apt-get update -y
apt-get install -y --no-install-recommends apt-utils
apt-get install -y xxd
apt-get install -y coreutils

# generate password hash
SALT=$(od -A n -t x -N 4 /dev/urandom)
HASH=$SALT$(echo -n $RABBITMQ_PASSWORD | xxd -ps | tr -d '\n' | tr -d ' ')
HASH=$(echo -n $HASH | xxd -r -p | sha256sum | head -c 128)
HASH=$(echo -n $SALT$HASH | xxd -r -p | base64 | tr -d '\n')

# replace env vars in definitions.json
sed -i "s|{{RABBITMQ_USERNAME}}|$RABBITMQ_USERNAME|g" /etc/rabbitmq/definitions.json
sed -i "s|{{RABBITMQ_PASSWORD_HASH}}|$HASH|g" /etc/rabbitmq/definitions.json
