FROM node:latest
LABEL MAINTAINER="Gabriel Dylan"
ENV PORT=3000 NODE_ENV=devlopment HOST=mongodb DB=ins-clone
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT npm start
EXPOSE $PORT