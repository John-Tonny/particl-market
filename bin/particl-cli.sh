#!/bin/bash
if (( $# == 0 )); then
    echo "usage: service command params..."
    echo ""
    echo "example: vircle-cli.sh particld1 help"
    exit
elif (( $# == 1 )); then
    SERVICE="$1"
    shift
    echo ">>> docker-compose exec $SERVICE /opt/vircle/bin/vircle-cli help"
    docker-compose exec "$SERVICE" /opt/vircle/bin/vircle-cli help
else
    SERVICE="$1"
    shift
    echo ">>> docker-compose exec $SERVICE /opt/vircle/bin/vircle-cli $@"
    docker-compose exec "$SERVICE" /opt/vircle/bin/vircle-cli "$@"
fi

