FROM minio/minio:latest

ARG MINIO_USERNAME
ARG MINIO_PASSWORD

ENV MINIO_ACCESS_KEY=${MINIO_USERNAME}
ENV MINIO_SECRET_KEY=${MINIO_PASSWORD}

EXPOSE 9000

CMD ["server", "/data"]

HEALTHCHECK CMD curl -f http://localhost:9000/minio/health/live
