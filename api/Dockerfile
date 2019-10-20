FROM node:12-alpine

WORKDIR /root
COPY . .
RUN yarn
RUN yarn build
COPY ./src/util/mail-service/templates/ ./build/util/mail-service/templates/

EXPOSE 80

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost || exit 1

CMD [ "yarn", "start:prod" ]
