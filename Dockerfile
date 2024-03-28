FROM node:16-alpine

WORKDIR /app

RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz

RUN apk add --no-cache curl

COPY package.json yarn.lock /app/

RUN mkdir src && yarn install

COPY . .


RUN yarn build

CMD yarn start