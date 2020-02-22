FROM node:12-alpine

WORKDIR /root
COPY . .
RUN yarn
RUN yarn build
COPY ./src/common/services/mail-service/templates/ ./build/common/services/mail-service/templates/
RUN chmod +x healthcheck.js

EXPOSE 80

HEALTHCHECK CMD ["node", "healthcheck.js"]

CMD [ "yarn", "start:prod" ]
