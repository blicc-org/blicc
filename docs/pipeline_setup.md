## Pipeline environment variables

Set the following environment variables in the gitlab CI/CD settings.

```sh
ADMIN_MAIL=contact@example.com
ADMIN_PASSWORD=your_password
API_TEST_TARGET=https://api.testing-example.org
MAIL_ADDRESS=noreply@example.org
MAIL_HOST=smtp.ionos.de
MAIL_PASSWORD=password
POSTGRES_PASSWORD=password
MONGODB_PASSWORD=password
PROD_IP=0.0.0.0
REGISTRY_DOMAIN=registry.example.com
REPO=example
SSH_PRIVATE_KEY=ssh_private_key_string
TEST_IP=0.0.0.0
APP_ORIGIN=https://example.com
MOCK_TEST_TARGET=http://mock.testing-stage.org
DELIVERY_TEST_TARGET_WEBSOCKET=wss://delivery.testing-stage.org
DELIVERY_TEST_TARGET=https://delivery.testing-stage.org
```
