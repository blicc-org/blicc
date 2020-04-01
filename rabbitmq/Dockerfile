FROM rabbitmq:3.8.3-management

COPY healthcheck.sh /home/healthcheck.sh

HEALTHCHECK CMD ["chmod", "+x", "/home/healthcheck.sh"]

EXPOSE 15672
