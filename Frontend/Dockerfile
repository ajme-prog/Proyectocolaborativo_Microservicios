FROM node:14-alpine
COPY . .
RUN npm install
RUN echo "PORT=8080 npm run start" >  main.sh
CMD [ "sh", "main.sh" ]
