FROM node:11.1.0-alpine

LABEL maintainer="benjamin.ihrig@gmail.com"

RUN npm install -g serve

COPY ./dist/fwla-expansion ./app

EXPOSE 5000

ENTRYPOINT [ "serve", "-s", "app" ]
