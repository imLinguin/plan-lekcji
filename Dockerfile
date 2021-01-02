FROM node:14.15.3-alpine3.11

WORKDIR /dir

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm","start"]