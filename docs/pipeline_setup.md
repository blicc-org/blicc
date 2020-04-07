# Pipeline Setup

Setup a Docker registry as well as a Gitlab pipeline.

## Environment variables

Set the following environment variables in the gitlab CI/CD settings. Depending on the number if services you have, you need to alter the `.gitlab-ci.yml` as well as the pipeline environment variables with a fitting number of `PROD_IPs`.

### IPs
    TEST_IP=0.0.0.0
    PROD_IP=0.0.0.0
    PROD_IP_2=0.0.0.0

### PostgreSQL
    POSTGRES_USERNAME=admin
    POSTGRES_PASSWORD=test

### MongoDB
    MONGODB_USERNAME=admin
    MONGODB_PASSWORD=test

### RabbitMQ
    RABBITMQ_COOKIE=cookie
    RABBITMQ_USERNAME=admin
    RABBITMQ_PASSWORD=test

### MinIO
    MINIO_USERNAME=admin
    MINIO_PASSWORD=password

### Traefik
    TRAEFIK_PASSWORD=admin:pwhash

> Create the credentials hash with: `echo $(htpasswd -nb user password) | sed -e s/\\$/\\$\\$/g`.

### Mail Server
    MAIL_ADDRESS=noreply@example.org
    MAIL_HOST=smtp.ionos.de
    MAIL_PASSWORD=password

### Credentials
    ADMIN_MAIL=user.name@example.com
    ADMIN_PASSWORD=test

> Credentials for an administrator account which gets initialized in the setup process of the application itself. 

###  SSH key
    SSH_PRIVATE_KEY=ssh_private_key_string

### URLs
    API_TEST_TARGET=https://api.testing-stage.org/
    APP_ORIGIN=https://example.com
    DELIVERY_TEST_TARGET_WEBSOCKET=wss://delivery.testing-stage.org
    DELIVERY_TEST_TARGET=https://delivery.testing-stage.org
    MOCK_TEST_TARGET=https://mock.testing-stage.org
