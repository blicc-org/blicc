## Pipeline environment variables

Set the following environment variables in the gitlab CI/CD settings. Depending on the number if services you have, you need to alter the `.gitlab-ci.yml` as well as the pipeline environment variables with a fitting number of `PROD_IPs`.

    ADMIN_MAIL=user.name@example.com
    ADMIN_PASSWORD=test
    API_TEST_TARGET=https://api.testing-example.org
    APP_ORIGIN=https://example.com
    DELIVERY_TEST_TARGET_WEBSOCKET=wss://delivery.testing-stage.org
    DELIVERY_TEST_TARGET=https://delivery.testing-stage.org
    MAIL_ADDRESS=noreply@example.org
    MAIL_HOST=smtp.ionos.de
    MAIL_PASSWORD=password
    MOCK_TEST_TARGET=http://mock.testing-stage.org
    MONGODB_PASSWORD=password
    POSTGRES_PASSWORD=password
    # echo $(htpasswd -nb user password) | sed -e s/\\$/\\$\\$/g
    TRAEFIK_PASSWORD=admin:pwhash
    PROD_IP=0.0.0.0
    PROD_IP_2=0.0.0.0
    SSH_PRIVATE_KEY=ssh_private_key_string
    TEST_IP=0.0.0.0
