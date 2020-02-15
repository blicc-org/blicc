## Pipeline environment variables

Set the following environment variables in the gitlab CI/CD settings as well as in a `.env` file in the root directory of the project.

```sh
ADMIN_MAIL=contact@example.com
ADMIN_PASSWORD=your_password
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
PROD_IP=0.0.0.0
REGISTRY_DOMAIN=registry.example.com
REPO=example
SSH_PRIVATE_KEY=ssh_private_key_string
TEST_IP=0.0.0.0
```

For the integration tests set one `.env` file in the `/api` as well as the `/delivery` folder with the following variables:

`.env` in the `/api` folder:
```sh
API_TEST_TARGET=http://localhost
ADMIN_MAIL=contact@example.com
ADMIN_PASSWORD=your_password
```

`.env` in the `/delivery` folder:

```sh
API_TEST_TARGET=http://localhost
DELIVERY_TEST_TARGET_WEBSOCKET=ws://localhost:8080
MOCK_TEST_TARGET=https://mock.testing-stage.org/
ADMIN_MAIL=contact@example.com
ADMIN_PASSWORD=your_password
```
