# build environment
FROM node:12-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# production environment
FROM nginx:1.17.4
WORKDIR /root

# install brotli nginx module
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y git wget unzip libpcre3 libpcre3-dev zlib1g zlib1g-dev openssl libssl-dev gcc build-essential
RUN wget https://nginx.org/download/nginx-1.17.4.tar.gz && tar zxvf nginx-1.17.4.tar.gz
RUN git clone https://github.com/google/ngx_brotli.git
RUN cd ngx_brotli && git submodule update --init
RUN cd ~/nginx-1.17.4 && ./configure --with-compat --add-dynamic-module=../ngx_brotli && make modules && cp objs/*.so /etc/nginx/modules
RUN chmod 644 /etc/nginx/modules/*.so

COPY --from=builder /app/build /var/www/blicc.org/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/healthcheck.sh /bin/healthcheck.sh

EXPOSE 80

HEALTHCHECK CMD ["sh", "/bin/healthcheck.sh"]
