#!/bin/bash

set -ex

IMAGE_NAME="sirwojtek/dragon-go"

docker build -t ${IMAGE_NAME} .
docker tag ${IMAGE_NAME} ${IMAGE_NAME}:latest
docker push ${IMAGE_NAME}
