# build environment
FROM node:12-alpine as node
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# production environment
FROM nginx:1.17
COPY --from=node /app/build /var/www/blicc.org/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
