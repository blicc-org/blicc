FROM node:12-alpine

WORKDIR /root
COPY . .
RUN yarn

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost || exit 1

CMD [ "yarn", "start" ]
