FROM node:14
COPY . .
RUN npm install
RUN npm i aws-sdk
RUN echo '. ./.env && node ./app.js' > app.sh
CMD [ "sh", "app.sh" ]
