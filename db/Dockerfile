FROM postgres:11

ENV POSTGRES_DB=database
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=root

COPY *.sql /docker-entrypoint-initdb.d/
