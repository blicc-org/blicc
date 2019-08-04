FROM node:12-alpine

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build

CMD [ "node", "build/index.js" ]
