FROM node:22-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]

EXPOSE 3000
