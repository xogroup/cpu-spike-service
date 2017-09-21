FROM mhart/alpine-node:8

MAINTAINER Lam Chan (lchan@xogrp.com)

CMD [ "node", "fibo.js", "10000" ]

WORKDIR /opt/app

COPY ./ /opt/app

RUN \
    # npm install -g node-gyp && \
    apk add --no-cache make gcc g++ python && \
    npm install --production && \
    apk del make gcc g++ python