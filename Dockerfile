FROM node:lts-alpine

RUN apk add --update python make g++
RUN npm install -g yarn

ADD ./backend /root/dragon-go/backend
ADD ./api /root/dragon-go/api
ADD ./package.json /root/dragon-go
ADD ./yarn.lock /root/dragon-go
WORKDIR /root/dragon-go

RUN yarn
WORKDIR /root/dragon-go/backend
RUN yarn && yarn build

WORKDIR /root/dragon-go
RUN yarn install --production
WORKDIR /root/dragon-go/backend
RUN yarn install --production


CMD yarn start:prod



