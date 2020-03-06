# Blicc

Blicc is a lightweight, user-friendly and secure data visualiation plattform.

## Docs

- [Codebase](docs/codebase.md)
- [Pipeline environment variables](docs/pipeline_setup.md)

## Quick start guide

### Prerequisites
You need to have [Git](https://git-scm.com/downloads), [Docker](https://docs.docker.com/install/), [Docker Compose](https://docs.docker.com/compose/install/) and [Yarn](https://classic.yarnpkg.com/en/docs/install) installed to be able to run the project.

> By using VS Code you can make use of the provided project settings.

### Clone

To clone the repository you need to use the `--recurse-submodules` tag to also clone the submodules.

    git clone --recurse-submodules https://github.com/blicc-org/blicc.git

### Setup project
If all the prerequisites have been installed, run the following command in the root folder to create rsa keys and `.env` files:

    yarn init

### Build and Run

To build and run the project for local development simply run:

    yarn start


## License

Copyright (c) Thilo Ilg. All rights reserved.

MIT license, see the [LICENSE](./LICENSE) file.
