#!/bin/sh
docker load --input wnc-fabric-frontend-latest.tar
docker run --name=wnc-fabric-frontend --rm -p 127.0.0.1:3005:3005 wnc-fabric-frontend