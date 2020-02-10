## What is Blicc?

Blicc is a lightweight, user-friendly and secure data visualiation plattform.

## Docs

- [Pipeline environment variables](docs/pipeline_setup.md)
- [Supported browser and operating systems](docs/supported.md)

### Codebase

#### Technologies

- **Node.js**: Node.js rest api using Koa and Typescript
- **React**: Progressive web app written in React
- **Go**: Golang websocket api
- **PostgreSQL** Relational database management system
- **MongoDB** Document-oriented database management system
- **Redis** Redis in-memory-database for caching

#### Folder structure

```bash
blicc/
├── api         # TWA
├── api         # Resource Management API
├── app         # PWA
├── db          # PostgreSQL database for Resource Management API
├── delivery    # Data Delivery API
├── docs        # Documentation
├── mongo       # MongoDB database for Data Delivery API
├── plugins     # Data visualization plugins for displaying diagrams
├── redis       # Redis cache for both APIs
├── scripts     # scripts for the infrastructure setup
```

#### Code Style

Blicc uses git hooks for prettier and eslint.

## License

MIT license, see the [LICENSE](./LICENSE) file.
