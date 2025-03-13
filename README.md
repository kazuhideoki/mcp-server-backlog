# mcp-server-backlog

## TODO

- [ ] フラグ渡すとこリファクタ
- [ ] apikey を CLI から渡せるようにする
- [ ] spaceId ふくめ、URL を CLI から渡せるようにする

## How to use

### Setup

Set Backlog Api Key to `apikey` file in the project root.

### Running the Server

You can run the server in two ways:

1. Using environment variables:

```sh
claude mcp add backlog node /path/to/mcp-server-backlog/dist/index.js --permission READ
```

2. Using command line flags:

```sh
# Development mode with permission flag
npm run dev -- --permission READ

# Production mode with permission flag
node /path/to/mcp-server-backlog/dist/index.js --permission READ
```

### Permission Levels

- `READ`: Read-only access (can only use GET endpoints)
- `MUTATE`: Full access (can use all endpoints including POST, PUT, PATCH, DELETE)
