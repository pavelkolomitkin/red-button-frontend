#!/usr/bin/env bash

docker container run --rm -it --name frontend-prod -v $(pwd)/../..:/app -w /app teracy/angular-cli:1.7.4 ng build --prod --aot --build-optimizer