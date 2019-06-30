FROM node

USER root
WORKDIR /app
COPY package.json /app
COPY npm-shrinkwrap.json /app
COPY ./dist/ /app

EXPOSE 3000

RUN npm install --production

CMD ["node", "./server.js"]
