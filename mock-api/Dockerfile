FROM node:12-alpine

WORKDIR /root
COPY . .
RUN yarn

EXPOSE 9090

HEALTHCHECK CMD ["node", "healthcheck.js", "-p", "9090"]

CMD [ "yarn", "start" ]
