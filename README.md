# mcp-server-backlog

## TODO

- [ ] フラグを渡せる仕組みに。
- [ ] apikey を CLI から渡せるようにする
- [ ] spaceId ふくめ、URL を CLI から渡せるようにする
- [ ] フラグ渡して権限管理

## How to use

Set Backlog Api Key to `apikey`

```sh
claude mcp add backlog export MCP_BACKLOG_SERVER_PERMISSION=READ; node /path/to/mcp-server-backlog/dist/index.js
```

## 対応エンドポイント構造化

- 属性
  - `read` or `create/update/delete` -> デフォルト: `read`
    - フラグ: `--crud`
  - `Role` -> デフォルト: `ALL`
    - フラグ: `--role=<role>`
