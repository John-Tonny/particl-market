#!/bin/bash
if (( $# == 0 )); then
    echo "usage: service command params..."
    echo ""
    echo "example: vpub-cli.sh particld1 help"
    exit
elif (( $# == 1 )); then
    SERVICE="$1"
    shift
    echo ">>> docker-compose exec $SERVICE /opt/vpub/bin/vpub-cli help"
    docker-compose exec "$SERVICE" /opt/vpub/bin/vpub-cli help
else
    SERVICE="$1"
    shift
    echo ">>> docker-compose exec $SERVICE /opt/vpub/bin/vpub-cli $@"
    docker-compose exec "$SERVICE" /opt/vpub/bin/vpub-cli "$@"
fi

