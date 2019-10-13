FROM node:lts-alpine

RUN apk add --update python make g++
RUN npm install -g yarn

ADD . /root/backend
WORKDIR /root/backend

RUN yarn

CMD yarn start:prod



