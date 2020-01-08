FROM golang:1.13

WORKDIR /root

COPY go.mod .
RUN go mod download

COPY . .

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt -y update
RUN apt -y install yarn

RUN yarn

EXPOSE 8080

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["yarn", "start"]
