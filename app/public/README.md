## What is Blicc?

### Vision

Blicc aims to provide a lightweight, user-friendly software to simplify data visualization in the browser.

## Docs

- [Get Started](docs/get-started.md)

### Codebase

#### Technologies

- **Full-stack JavaScript**:
  - **NodeJS**: Backend Node.js server with Koa
  - **React**: Frontend React app
- **RabbitMQ**: Open source message broker
- **ChartJS**: Simple yet flexible JavaScript charting library
- **Typescript**: Type-safe JavaScript in the backend
- **JWT**: Authentification
- **Socket.io**: For sending events via websockets

#### Folder structure

```sh
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
