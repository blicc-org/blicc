FROM node:12-alpine

WORKDIR /root
COPY . .
RUN yarn
RUN yarn build

CMD [ "yarn", "start:prod" ]
