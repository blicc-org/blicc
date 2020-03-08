# Blicc

Blicc is a lightweight, user-friendly and secure data visualiation plattform.

## Docs

- [Codebase](docs/codebase.md)
- [Pipeline environment variables](docs/pipeline_setup.md)

## Quick start guide

### Prerequisites
You need to have [Git](https://git-scm.com/downloads), [Docker](https://docs.docker.com/install/), [Docker Compose](https://docs.docker.com/compose/install/),
[Node.js](https://nodejs.org/en/download/) and [Yarn](https://classic.yarnpkg.com/en/docs/install) installed to be able to run and build the project.

> By using VS Code you can make use of the provided project settings.

#### Versions
A greater or equal version of the listed softwares is required.
* Git 2.21.1
* Docker 19.03.5
* Docker-Compose 1.25.4
* Node.js 12.13.1
* Yarn 1.19.2

> To run Docker Desktop on Windows 10 either Pro or Enterprise version is required.

### Clone

To clone the repository you need to use the `--recurse-submodules` tag to also clone the submodules.

    git clone --recurse-submodules git@github.com:blicc-org/blicc.git

### Setup project
If all the prerequisites have been installed, a rsa key needs to be generated as well as `.env` files created.

#### Generate RSA Key

The rsa key is used for authorizing users between the services. You need to generate a public and private key inside an `/certs` folder in the root directory if the monorepo. To do so you can use the following commands:

    mkdir -p certs
    openssl genrsa -out ./certs/rsa.pem 2048
    openssl rsa -in ./certs/rsa.pem -outform PEM -pubout -out ./certs/rsa_pub.pem

> The rsa keys are used for generating and validating JWT.

#### Environment variables
Examples for the environment variables are stored inside `.env.example` files in the following locations: 

```sh
    project/        # root folder
    ├── api         # resource management service
    ├── delivery    # data delivery service
    ├── plugins     # plugins for visualizing data
```

You need to rename the `.env.example` to `.env` and fill them with proper values.

### Build and Run

To build and run the project for local development simply run:

    yarn start

## License

Copyright (c) Thilo Ilg. All rights reserved.

MIT license, see the [LICENSE](./LICENSE) file.
