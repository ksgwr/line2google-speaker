#!/bin/sh
cd $(dirname $0)
/usr/local/bin/node app.js &
./node_modules/ngrok/bin/ngrok start --all --config ngrok.yml &

