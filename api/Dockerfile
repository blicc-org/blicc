FROM node:12-alpine

WORKDIR /root
COPY . .
RUN yarn
RUN chmod +x healthcheck.js

EXPOSE 80

HEALTHCHECK CMD ["node", "healthcheck.js"]

CMD [ "yarn", "start" ]
