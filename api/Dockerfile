FROM node:12-alpine

ENV ADMIN_MAIL=${ADMIN_MAIL}
ENV ADMIN_PASSWORD=${ADMIN_PASSWORD}

WORKDIR /root
COPY . .
RUN yarn
RUN yarn build
COPY ./src/common/services/mail-service/templates/ ./build/common/services/mail-service/templates/

EXPOSE 80

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost || exit 1

CMD [ "yarn", "start:prod" ]
