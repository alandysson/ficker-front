FROM node:18-alpine as base

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json yarn.lock /app/

RUN mkdir src && yarn install

COPY . .

RUN yarn build

CMD yarn start