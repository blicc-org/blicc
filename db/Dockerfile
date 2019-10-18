FROM postgres:11-alpine

ENV POSTGRES_DB=db
ENV POSTGRES_USER=api
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

COPY healthcheck /usr/local/bin/

HEALTHCHECK CMD ["healthcheck"]
