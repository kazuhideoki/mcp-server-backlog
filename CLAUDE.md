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

| MCP Tool Name | Backlog API Endpoint | Description | Parameters | Documentation |
|---------------|---------------------|-------------|------------|---------------|
| `space-activities` | GET /api/v2/space/activities | Returns recent updates in a space | `activityTypeIds`, `minId`, `maxId`, `count`, `order` | [Link](https://developer.nulab.com/docs/backlog/api/2/get-space-activities) |
| `activity` | GET /api/v2/activities/:activityId | Gets specific activity by ID | `activityId` (required) | [Link](https://developer.nulab.com/docs/backlog/api/2/get-activity) |
| `space-logo` | GET /api/v2/space/image | Gets the space logo image | None | [Link](https://developer.nulab.com/docs/backlog/api/2/get-space-logo) |
| `space-notification` | GET /api/v2/space/notification | Gets the space notification | None | [Link](https://developer.nulab.com/docs/backlog/api/2/get-space-notification) |
| `update-space-notification` | PUT /api/v2/space/notification | Updates the space notification | `content` (required) | [Link](https://developer.nulab.com/docs/backlog/api/2/update-space-notification) |
| `space-disk-usage` | GET /api/v2/space/diskUsage | Gets information about disk usage in the space | None | [Link](https://developer.nulab.com/docs/backlog/api/2/get-space-disk-usage) |
| `post-attachment-file` | POST /api/v2/space/attachment | Posts an attachment file to Backlog | `filePath` (required) | [Link](https://developer.nulab.com/docs/backlog/api/2/post-attachment-file) |
| `users` | GET /api/v2/users | Gets list of users in the space | None | [Link](https://developer.nulab.com/docs/backlog/api/2/get-users) |
| `user` | GET /api/v2/users/:userId | Gets information about a specific user | `userId` (required) | [Link](https://developer.nulab.com/docs/backlog/api/2/get-user) |
| `add-user` | POST /api/v2/users | Adds a new user to the space | `userId` (required), `password` (required), `name` (required), `mailAddress` (optional), `roleType` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/add-user) |
| `update-user` | PATCH /api/v2/users/:userId | Updates an existing user | `userId` (required), `password` (optional), `name` (optional), `mailAddress` (optional), `roleType` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/update-user) |
| `delete-user` | DELETE /api/v2/users/:userId | Deletes a user in the space | `userId` (required) | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-user) |
| `own-user` | GET /api/v2/users/myself | Gets information about the authenticated user | None | [Link](https://developer.nulab.com/docs/backlog/api/2/get-own-user) |
| `user-icon` | GET /api/v2/users/:userId/icon | Gets the icon of a specified user | `userId` (required) | [Link](https://developer.nulab.com/docs/backlog/api/2/get-user-icon) |
| `user-recent-updates` | GET /api/v2/users/:userId/activities | Gets list of recent updates by the specified user | `userId` (required), `activityTypeIds` (optional), `count` (optional), `order` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/get-user-recent-updates) |
| `received-star-list` | GET /api/v2/users/:userId/stars | Gets list of stars received by the specified user | `userId` (required), `minId` (optional), `maxId` (optional), `count` (optional), `order` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/get-received-star-list) |
| `count-received-stars` | GET /api/v2/users/:userId/stars/count | Counts stars received by the specified user | `userId` (required), `since` (optional), `until` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/count-received-stars) |
| `projects` | GET /api/v2/projects | Gets list of projects in the space | `archived` (optional), `all` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/get-projects) |
| `issues` | GET /api/v2/issues | Gets list of issues | `projectId` (optional), `statusId` (optional), `assigneeId` (optional), `count` (optional), `offset` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/get-issues) |
| `create-issue` | POST /api/v2/issues | Creates a new issue | `projectId` (required), `summary` (required), `issueTypeId` (required), `priorityId` (required), `description` (optional), `startDate` (optional), `dueDate` (optional), `assigneeId` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/add-issue) |
| `update-issue` | PATCH /api/v2/issues/:issueId | Updates an existing issue | `issueId` (required), `summary` (optional), `description` (optional), `statusId` (optional), `priorityId` (optional), `assigneeId` (optional), `startDate` (optional), `dueDate` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/update-issue) |
| `recently-viewed-issues` | GET /api/v2/users/myself/recentlyViewedIssues | Gets list of recently viewed issues | `order` (optional), `offset` (optional), `count` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/get-recently-viewed-issues) |
| `add-recently-viewed-issue` | POST /api/v2/users/myself/recentlyViewedIssues | Adds an issue to recently viewed issues | `issueId` (required) | [Link](https://developer.nulab.com/docs/backlog/api/2/add-recently-viewed-issue) |
| `recently-viewed-projects` | GET /api/v2/users/myself/recentlyViewedProjects | Gets list of recently viewed projects | `order` (optional), `offset` (optional), `count` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/get-recently-viewed-projects) |
| `recently-viewed-wikis` | GET /api/v2/users/myself/recentlyViewedWikis | Gets list of recently viewed wikis | `order` (optional), `offset` (optional), `count` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/get-recently-viewed-wikis) |
| `add-recently-viewed-wiki` | POST /api/v2/users/myself/recentlyViewedWikis | Adds a wiki to recently viewed wikis | `wikiId` (required) | [Link](https://developer.nulab.com/docs/backlog/api/2/add-recently-viewed-wiki) |

### Implementation Pattern

For adding new Backlog API endpoints:

1. Create a function in `src/backlog-api/` folder with appropriate naming
2. Use consistent error handling with axios
3. Register the API as an MCP tool in `src/index.ts`
4. Follow the existing parameter passing patterns

### Naming Conventions

To maintain consistency across the codebase, follow these naming conventions:

1. **MCP Tool Names**: Use kebab-case (e.g., `space-activities`, `add-recently-viewed-wiki`)
   - For GET requests that retrieve a list of items, prefer the noun without prefix (e.g., `users`, `projects`)
   - For GET requests that retrieve a single item, use the singular form (e.g., `user`, `activity`)
   - For operations that modify data, prefix with the operation name (e.g., `add-user`, `update-issue`)

2. **File Names**: Name based on Backlog API documentation titles
   - For GET operations: use `get-` prefix to match documentation (e.g., `get-recently-viewed-issues.ts`)
   - For operations that modify data: use appropriate prefix (e.g., `add-recently-viewed-wiki.ts`, `update-issue.ts`)

3. **Function Names**: Use camelCase with appropriate action prefix
   - For GET operations: use `get` prefix (e.g., `getSpaceActivities`, `getUsers`)
   - For POST operations: use `create` or `add` prefix (e.g., `createIssue`, `addUser`)
   - For PUT/PATCH operations: use `update` prefix (e.g., `updateIssue`)
   - For DELETE operations: use `delete` prefix (e.g., `deleteUser`)

### API Documentation Reference

Official Backlog API documentation: https://developer.nulab.com/docs/backlog/
