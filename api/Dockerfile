FROM node:10-alpine

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 80
CMD [ "yarn", "start" ]
