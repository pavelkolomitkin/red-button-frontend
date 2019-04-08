#!/usr/bin/env bash
echo 'Starting development frontend environment...'

docker container run --rm -d -p 4200:4200 -v $(pwd)/../..:/app -w /app teracy/angular-cli:1.7.4 /bin/bash -c "ng serve --host=0.0.0.0"

URL=http://localhost:4200
if which xdg-open > /dev/null
then
  xdg-open $URL
elif which gnome-open > /dev/null
then
  gnome-open $URL
fi
