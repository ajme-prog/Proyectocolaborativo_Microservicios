FROM node:alpine

WORKDIR /app

COPY . /app/

RUN npm install -g  http-server

CMD ["http-server","."]

EXPOSE 8080
