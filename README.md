## What is Blicc?

### Vision

As small and medium-sized companies it is hard to analyse manufacturing data without spending a lot of money for software licenses. Often web-based data visualization software is out of date with the todays interface standards, hard to scale and not able to run in a docker environment. Blicc aims to provide a lightweight, user-friendly software to simplify data visualization in the browser.

## Docs

- [Get Started](docs/get-started.md)

### Codebase

#### Technologies

- **Full-stack JavaScript**:
  - **NodeJS**: Backend Node.js server
  - **React**: Frontend React app
- **RabbitMQ**: Open source message broker
- **ChartJS**: Simple yet flexible JavaScript charting library
- **Typescript**: Type-safe JavaScript in the backend
- **PassportJS**: Authentication

#### Folder structure

```sh
blicc/
├── api     # backend node.js api code 
├── app     # frontend react code
├── db      # database
├── docker  # additional docker sripts
├── scripts # deployment scripts
├── server  # server config files
```

#### Code Style

Blicc uses git hooks for prettier and eslint.

## License	
MIT license, see the [LICENSE](./LICENSE) file.
