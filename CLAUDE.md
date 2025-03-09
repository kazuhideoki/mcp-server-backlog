# CLAUDE.md

## Build & Development Commands

```bash
# Install dependencies
npm install

# Run development server with ts-node
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run built JavaScript
npm run start

# Type check without emitting files
npm run typecheck
```

## Code Style Guidelines

- **Naming**: camelCase for variables/functions, PascalCase for classes, kebab-case for file names
- **Imports**: Group imports by external libraries, then internal modules
- **Formatting**: 2-space indentation, trailing commas in multiline objects/arrays
- **Types**: Use TypeScript when possible, prefer strict typing
- **Error Handling**: Always catch and properly handle errors, avoid silent failures
- **Documentation**: JSDoc for functions, inline comments for complex logic

## Project Structure

This project uses the Model Context Protocol SDK. Follow its conventions when extending.

```
/
├── src/           # TypeScript source files
│   └── index.ts   # Main entry point
├── dist/          # Compiled JavaScript output
└── node_modules/  # Dependencies
```

## Git Rules

- Commit messages can be in Japanese
- Do not include signatures or meta information in commit messages ("Generated with..." phrases are unnecessary)

## MCP Integration

- **backlog**: Implement backlog functionality using MCP SDK

## Backlog API Implementation

### Implemented APIs

| MCP Tool Name | Backlog API Endpoint | Description | Parameters |
|---------------|---------------------|-------------|------------|
| `space-activities` | GET /api/v2/space/activities | Returns recent updates in a space | `activityTypeIds`, `minId`, `maxId`, `count`, `order` |
| `activity` | GET /api/v2/activities/:activityId | Gets specific activity by ID | `activityId` (required) |
| `space-logo` | GET /api/v2/space/image | Gets the space logo image | None |
| `space-notification` | GET /api/v2/space/notification | Gets the space notification | None |
| `update-space-notification` | PUT /api/v2/space/notification | Updates the space notification | `content` (required) |

### Implementation Pattern

For adding new Backlog API endpoints:

1. Create a function in `src/backlog-api/` folder with appropriate naming
2. Use consistent error handling with axios
3. Register the API as an MCP tool in `src/index.ts`
4. Follow the existing parameter passing patterns

### API Documentation Reference

Official Backlog API documentation: https://developer.nulab.com/docs/backlog/
