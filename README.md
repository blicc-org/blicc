## What is Blicc?

Blicc is a lightweight, user-friendly and secure data visualiation plattform.

## Docs

- [Pipeline environment variables](docs/pipeline_setup.md)

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
├── api         # Resource Management API
├── app         # PWA
├── db          # PostgreSQL database for Resource Management API
├── delivery    # Data Delivery API
├── docs        # Documentation
├── mock-api    # A mock api to replace external api for integration tests
├── mongo       # MongoDB database for Data Delivery API
├── plugins     # Data visualization plugins for displaying diagrams
├── redis       # Redis cache for both APIs
├── scripts     # scripts for the infrastructure setup
```

## License

MIT license, see the [LICENSE](./LICENSE) file.
