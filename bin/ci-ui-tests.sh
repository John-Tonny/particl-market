#!/bin/sh
set -e

# setup config files
cp -f .env.ci.app1 .env
cp -f .env.ci.test .env.test
cp -f .env.ci.blackbox .env.blackbox

yarn install --check-files

sleep 30s

# wait until core rpc and the mp cli are up
./dockerize -wait tcp://circle.vpub.xyz:58935 -timeout 60s
echo "connected to: tcp://circle.vpub.xyz:58935"
./dockerize -wait tcp://circle.vpub.xyz:59935 -timeout 60s
echo "connected to: tcp://circle.vpub.xyz:59935"
./dockerize -wait http://circle.vpub.xyz:3100/cli/ -timeout 600s
echo "connected to: http://circle.vpub.xyz:3100"
./dockerize -wait http://circle.vpub.xyz:3200/cli/ -timeout 600s
echo "connected to: http://circle.vpub.xyz:3200"

sleep 10s

npm run test:ui:pretty
