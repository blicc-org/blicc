FROM node:12-alpine

WORKDIR /root
COPY . .
RUN yarn
RUN yarn build

EXPOSE 80

CMD [ "yarn", "start:prod" ]
