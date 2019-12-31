## What is Blicc?

Blicc is a lightweight, user-friendly and secure data visualiation plattform. Make your data talk.

## Docs

- [Pipeline setup](docs/pipeline_setup.md)
- [Supported browser and operating systems](docs/supported.md)

### Codebase

#### Technologies

- **Node.js**: Node.js rest api using Koa and Typescript
- **React**: Progressive web app written in React
- **Go**: Golang websocket api
- **PostgreSQL** Relational database management system
- **Redis** Cache data for code splitting

#### Folder structure

```bash
blicc/
├── api         # Api for controlling user and dashboard settings
├── app         # Application to display data and arrange dashboards
├── db          # Posgres database for storing user and dashboard settings
├── delivery    # Realtime data streaming via websockets
├── docs        # Documentation
├── plugins     # Data visualization plugins for displaying diagrams
├── redis       # Redis provides fast access to plugins, cached code splitting
├── scripts     # scripts for the microservice setup
```

#### Code Style

Blicc uses git hooks for prettier and eslint.

## License

MIT license, see the [LICENSE](./LICENSE) file.
