FROM node:12-alpine

WORKDIR /root
COPY . .
RUN yarn
RUN yarn build

EXPOSE 80

HEALTHCHECK CMD ["node", "healthcheck.js"]

CMD [ "yarn", "start:prod" ]
