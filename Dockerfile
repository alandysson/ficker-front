FROM node:16-alpine

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json yarn.lock /app/

RUN mkdir src && yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn",  "start"]

FROM nginx:alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80