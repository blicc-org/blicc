## What is Blicc?

### Vision

Blicc aims to provide a lightweight, user-friendly and secure progressive web app to simplify data visualization on all devices.

## Docs

- [Get started](docs/get-started.md)
- [Supported browser and operating systems](docs/supported.md)

### Codebase

#### Technologies

- **Full-stack & Go**:
  - **NodeJS**: Backend Node.js server with Koa
  - **React**: Frontend React app
  - **Go**: Go for data delivery through websockets
- **RabbitMQ**: Open source message broker
- **ChartJS**: Simple yet flexible JavaScript charting library
- **Typescript**: Type-safe JavaScript in the backend
- **JWT**: Authentification

#### Folder structure

```bash
blicc/
├── api     # backend node.js api code
├── app     # frontend react code
├── db      # database
├── docs    # documentation
├── server  # server config files
```

#### Code Style

Blicc uses git hooks for prettier and eslint.

## License

MIT license, see the [LICENSE](./LICENSE) file.
