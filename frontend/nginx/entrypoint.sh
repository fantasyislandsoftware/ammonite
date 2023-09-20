#!/bin/sh

DATA=$(cat /env.json)

if [ -z "$DATA" ]
then
      DATA="{}"
else
    DATA="${DATA//\"/\\\"}"
    DATA="${DATA//\//\\\/}"
fi

sed -i "s/window.SERVER_DATA={}/window.SERVER_DATA=$(echo -n $DATA)/" /usr/share/nginx/html/index.html

exec nginx -g "daemon off;"
