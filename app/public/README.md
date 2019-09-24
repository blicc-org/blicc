## What is Blicc?

### Vision

Blicc aims to provide a lightweight, user-friendly and secure progressive web app to simplify data visualization on all devices.

## Docs

- [Get started](docs/get-started.md)
- [Supported browser and operating systems](docs/supported.md)

### Codebase

#### Services

- **app**: Application to display data and arrange dashboards
- **api**: Api for controlling user and dashboard settings
- **db**: Database for persisting api specific data
- **delivery**: A service focused on data delivery to the app

#### Technologies

- **Fullstack Javascript/Go**:
  - **Node.js**: Node.js rest api using Koa
  - **React**: Progressive web app written in React
  - **Go**: Golang websocket api
  - **PostgreSQL** Relational database management system
- **RabbitMQ**: Open source message broker
- **ChartJS**: Simple yet flexible JavaScript charting library
- **Typescript**: Type-safe JavaScript in the backend
- **JWT**: Authentification

#### Folder structure

```bash
blicc/
├── api         # backend node.js api code
├── app         # frontend react code
├── db          # database
├── delivery    # data delivery
├── docs        # documentation
├── scripts     # scripts for the microservice setup
```

#### Code Style

Blicc uses git hooks for prettier and eslint.

## License

MIT license, see the [LICENSE](./LICENSE) file.
