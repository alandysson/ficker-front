FROM node:18-alpine as base

WORKDIR /app

RUN apk add --no-cache curl

COPY package.json yarn.lock /app/

RUN mkdir src && yarn install

COPY . .


RUN yarn build

CMD yarn start

FROM base as test
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=yarn-lock.json,target=yarn-lock.json \
  --mount=type=cache,target=/root/.npm \
  npm ci --include=dev
USER node
COPY . .
RUN npm run test