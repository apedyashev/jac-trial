FROM node:10-alpine

RUN mkdir /src
ADD ./ /src
WORKDIR /src

RUN npm install -g yarn
RUN yarn install
