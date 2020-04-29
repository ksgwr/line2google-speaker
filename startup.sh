#!/bin/sh
cd $(dirname $0)
/usr/local/bin/node server_for_line.js &
./node_modules/ngrok/bin/ngrok start --all --config ngrok.yml &

