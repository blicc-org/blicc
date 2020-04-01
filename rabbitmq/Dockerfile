FROM rabbitmq:3.8.3-management

WORKDIR /root

COPY healthcheck.sh ./healthcheck.sh

HEALTHCHECK CMD ["chmod", "+x", "healthcheck.sh"]

EXPOSE 15672
