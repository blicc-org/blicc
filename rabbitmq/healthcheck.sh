#!/bin/bash
set -eo pipefail

if rabbitmqctl status; then
	exit 0
fi

exit 1
