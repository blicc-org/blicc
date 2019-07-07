# build environment
FROM node:10-alpine as node
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# production environment
FROM nginx:alpine
COPY --from=node /app/build /var/www/blicc.org/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
