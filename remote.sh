#!/bin/sh

MINDUSTRY_PORT=6859
LISTEN_PORT=8990

websocketd -maxforks=1 -port $LISTEN_PORT -- nc localhost $MINDUSTRY_PORT
