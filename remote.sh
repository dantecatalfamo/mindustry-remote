#!/bin/sh

websocketd -maxforks=1 -port 8990 -- nc localhost 6859
