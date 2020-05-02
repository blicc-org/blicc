FROM rabbitmq:3.8.3-management

ARG RABBITMQ_COOKIE
ARG RABBITMQ_USERNAME
ARG RABBITMQ_PASSWORD
ARG RABBITMQ_PASSWORD_HASH

ENV RABBITMQ_ERLANG_COOKIE=${RABBITMQ_COOKIE}
ENV RABBITMQ_DEFAULT_USER=${RABBITMQ_USERNAME}
ENV RABBITMQ_DEFAULT_PASS=${RABBITMQ_PASSWORD}
ENV RABBITMQ_CONFIG_FILE=/etc/rabbitmq/rabbitmq

COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf
COPY definitions.json /etc/rabbitmq/definitions.json
COPY healthcheck.sh /home/healthcheck.sh

RUN   sed -i "s|{{RABBITMQ_USERNAME}}|$RABBITMQ_USERNAME|g" /etc/rabbitmq/definitions.json
RUN   sed -i "s|{{RABBITMQ_PASSWORD}}|$RABBITMQ_PASSWORD|g" /etc/rabbitmq/definitions.json

HEALTHCHECK CMD ["chmod", "+x", "/home/healthcheck.sh"]

EXPOSE 15672
