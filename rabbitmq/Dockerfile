FROM rabbitmq:3.8.3-management

ARG RABBITMQ_COOKIE
ARG RABBITMQ_USERNAME
ARG RABBITMQ_PASSWORD

ENV RABBITMQ_ERLANG_COOKIE=${RABBITMQ_COOKIE}
ENV RABBITMQ_CONFIG_FILE=/etc/rabbitmq/rabbitmq

COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf
COPY definitions.json /etc/rabbitmq/definitions.json
COPY healthcheck.sh /root/healthcheck.sh
COPY init.sh /root/init.sh

RUN sh /root/init.sh $RABBITMQ_USERNAME $RABBITMQ_PASSWORD

HEALTHCHECK CMD ["chmod", "+x", "/root/healthcheck.sh"]

EXPOSE 15672
