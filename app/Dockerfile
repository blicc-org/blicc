FROM node:12-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

EXPOSE 3000

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["yarn", "start"]
