FROM node:18.20.4-alpine

RUN npm install -g ember-cli

# Thanks: https://dev.to/michalbryxi/testing-emberjs-in-chrome-in-docker--4cb5
RUN echo http://dl-3.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
  apk add chromium
