FROM node:12-alpine

WORKDIR /root
COPY . .
RUN yarn

<<<<<<< HEAD
EXPOSE 9090

HEALTHCHECK CMD ["node", "healthcheck.js", "-p", "9090"]
=======
HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost || exit 1
>>>>>>> parent of d2ef1f4... fix(pipeline): remove wrong healthcheck

CMD [ "yarn", "start" ]
