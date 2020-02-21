FROM node:12-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

EXPOSE 3000

HEALTHCHECK CMD ["chmod", "+x", "healthcheck.sh"]

CMD ["yarn", "start"]
