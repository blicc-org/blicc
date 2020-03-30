FROM rabbitmq:3.8-management

WORKDIR /root

COPY . .

HEALTHCHECK CMD ["chmod", "+x", "healthcheck.sh"]

EXPOSE 15672 5672
