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
- Never commit changes without explicit user approval
- Request confirmation before creating a commit, even if changes seem minor

## MCP Integration

- **backlog**: Implement backlog functionality using MCP SDK

## Backlog API Implementation

### Implemented APIs

| MCP Tool Name                          | Backlog API Endpoint                            | Description                                       | Parameters                                                                                                                                                                                                                          | Documentation                                                                               |
| -------------------------------------- | ----------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `get-recent-updates`                   | GET /api/v2/space/activities                    | Returns recent updates in a space                 | `activityTypeIds`, `minId`, `maxId`, `count`, `order`                                                                                                                                                                               | [Link](https://developer.nulab.com/docs/backlog/api/2/get-recent-updates)                   |
| `get-activity`                         | GET /api/v2/activities/:activityId              | Gets specific activity by ID                      | `activityId` (required)                                                                                                                                                                                                             | [Link](https://developer.nulab.com/docs/backlog/api/2/get-activity)                         |
| `get-space-logo`                       | GET /api/v2/space/image                         | Gets the space logo image                         | None                                                                                                                                                                                                                                | [Link](https://developer.nulab.com/docs/backlog/api/2/get-space-logo)                       |
| `get-space-notification`               | GET /api/v2/space/notification                  | Gets the space notification                       | None                                                                                                                                                                                                                                | [Link](https://developer.nulab.com/docs/backlog/api/2/get-space-notification)               |
| `update-space-notification`            | PUT /api/v2/space/notification                  | Updates the space notification                    | `content` (required)                                                                                                                                                                                                                | [Link](https://developer.nulab.com/docs/backlog/api/2/update-space-notification)            |
| `get-space-disk-usage`                 | GET /api/v2/space/diskUsage                     | Gets information about disk usage in the space    | None                                                                                                                                                                                                                                | [Link](https://developer.nulab.com/docs/backlog/api/2/get-space-disk-usage)                 |
| `post-attachment-file`                 | POST /api/v2/space/attachment                   | Posts an attachment file to Backlog               | `filePath` (required)                                                                                                                                                                                                               | [Link](https://developer.nulab.com/docs/backlog/api/2/post-attachment-file)                 |
| `users`                                | GET /api/v2/users                               | Gets list of users in the space                   | None                                                                                                                                                                                                                                | [Link](https://developer.nulab.com/docs/backlog/api/2/get-user-list)                        |
| `user`                                 | GET /api/v2/users/:userId                       | Gets information about a specific user            | `userId` (required)                                                                                                                                                                                                                 | [Link](https://developer.nulab.com/docs/backlog/api/2/get-user)                             |
| `add-user`                             | POST /api/v2/users                              | Adds a new user to the space                      | `userId` (required), `password` (required), `name` (required), `mailAddress` (optional), `roleType` (optional)                                                                                                                      | [Link](https://developer.nulab.com/docs/backlog/api/2/add-user)                             |
| `update-user`                          | PATCH /api/v2/users/:userId                     | Updates an existing user                          | `userId` (required), `password` (optional), `name` (optional), `mailAddress` (optional), `roleType` (optional)                                                                                                                      | [Link](https://developer.nulab.com/docs/backlog/api/2/update-user)                          |
| `delete-user`                          | DELETE /api/v2/users/:userId                    | Deletes a user in the space                       | `userId` (required)                                                                                                                                                                                                                 | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-user)                          |
| `get-own-user`                         | GET /api/v2/users/myself                        | Gets information about the authenticated user     | None                                                                                                                                                                                                                                | [Link](https://developer.nulab.com/docs/backlog/api/2/get-own-user)                         |
| `get-user-icon`                        | GET /api/v2/users/:userId/icon                  | Gets the icon of a specified user                 | `userId` (required)                                                                                                                                                                                                                 | [Link](https://developer.nulab.com/docs/backlog/api/2/get-user-icon)                        |
| `get-user-recent-updates`              | GET /api/v2/users/:userId/activities            | Gets list of recent updates by the specified user | `userId` (required), `activityTypeIds` (optional), `count` (optional), `order` (optional)                                                                                                                                           | [Link](https://developer.nulab.com/docs/backlog/api/2/get-user-recent-updates)              |
| `get-received-star-list`               | GET /api/v2/users/:userId/stars                 | Gets list of stars received by the specified user | `userId` (required), `minId` (optional), `maxId` (optional), `count` (optional), `order` (optional)                                                                                                                                 | [Link](https://developer.nulab.com/docs/backlog/api/2/get-received-star-list)               |
| `count-user-received-stars`            | GET /api/v2/users/:userId/stars/count           | Counts stars received by the specified user       | `userId` (required), `since` (optional), `until` (optional)                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/count-user-received-stars)            |
| `projects`                             | GET /api/v2/projects                            | Gets list of projects in the space                | `archived` (optional), `all` (optional)                                                                                                                                                                                             | [Link](https://developer.nulab.com/docs/backlog/api/2/get-project-list)                     |
| `project`                              | GET /api/v2/projects/:projectIdOrKey            | Gets information about a specific project         | `projectIdOrKey` (required)                                                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-project)                          |
| `add-project`                          | POST /api/v2/projects                           | Adds a new project                                | `name` (required), `key` (required), `chartEnabled` (required), `textFormattingRule` (optional), `projectLeaderCanEditProjectLeader` (optional), `subtaskingEnabled` (optional), `externalLinks` (optional)                         | [Link](https://developer.nulab.com/docs/backlog/api/2/add-project)                          |
| `update-project`                       | PATCH /api/v2/projects/:projectIdOrKey          | Updates a project                                 | `projectIdOrKey` (required), `name` (optional), `key` (optional), `chartEnabled` (optional), `subtaskingEnabled` (optional), `projectLeaderCanEditProjectLeader` (optional), `textFormattingRule` (optional), `archived` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/update-project)                       |
| `delete-project`                       | DELETE /api/v2/projects/:projectIdOrKey         | Deletes a project                                 | `projectIdOrKey` (required)                                                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-project)                       |
| `get-project-icon`                     | GET /api/v2/projects/:projectIdOrKey/image      | Gets the project logo image                       | `projectIdOrKey` (required)                                                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-project-icon)                     |
| `get-project-recent-updates`           | GET /api/v2/projects/:projectIdOrKey/activities | Gets list of recent updates in a project          | `projectIdOrKey` (required), `activityTypeIds` (optional), `minId` (optional), `maxId` (optional), `count` (optional), `order` (optional)                                                                                           | [Link](https://developer.nulab.com/docs/backlog/api/2/get-project-recent-updates)           |
| `get-project-user-list`                | GET /api/v2/projects/:projectIdOrKey/users      | Gets list of users in a project                   | `projectIdOrKey` (required)                                                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-project-user-list)                |
| `add-project-user`                     | POST /api/v2/projects/:projectIdOrKey/users     | Adds a user to a project                          | `projectIdOrKey` (required), `userId` (required)                                                                                                                                                                                    | [Link](https://developer.nulab.com/docs/backlog/api/2/add-project-user)                     |
| `delete-project-user`                  | DELETE /api/v2/projects/:projectIdOrKey/users   | Deletes a user from a project                     | `projectIdOrKey` (required), `userId` (required)                                                                                                                                                                                    | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-project-user)                  |
| `get-status-list`                      | GET /api/v2/projects/:projectIdOrKey/statuses   | Gets status list of a project                     | `projectIdOrKey` (required)                                                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-status-list)                      |
| `get-priority-list`                    | GET /api/v2/priorities                          | Gets priority list                                | None                                                                                                                                                                                                                                | [Link](https://developer.nulab.com/docs/backlog/api/2/get-priority-list)                    |
| `get-resolution-list`                  | GET /api/v2/resolutions                         | Gets resolution list                              | None                                                                                                                                                                                                                                | [Link](https://developer.nulab.com/docs/backlog/api/2/get-resolution-list)                  |
| `get-issues`                           | GET /api/v2/issues                              | Gets list of issues                               | `projectId` (optional), `statusId` (optional), `assigneeId` (optional), `count` (optional), `offset` (optional)                                                                                                                     | [Link](https://developer.nulab.com/docs/backlog/api/2/get-issue-list)                       |
| `add-issue`                            | POST /api/v2/issues                             | Creates a new issue                               | `projectId` (required), `summary` (required), `issueTypeId` (required), `priorityId` (required), `description` (optional), `startDate` (optional), `dueDate` (optional), `assigneeId` (optional)                                    | [Link](https://developer.nulab.com/docs/backlog/api/2/add-issue)                            |
| `update-issue`                         | PATCH /api/v2/issues/:issueId                   | Updates an existing issue                         | `issueId` (required), `summary` (optional), `description` (optional), `statusId` (optional), `priorityId` (optional), `assigneeId` (optional), `startDate` (optional), `dueDate` (optional)                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/update-issue)                         |
| `get-list-of-recently-viewed-issues`   | GET /api/v2/users/myself/recentlyViewedIssues   | Gets list of recently viewed issues               | `order` (optional), `offset` (optional), `count` (optional)                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-list-of-recently-viewed-issues)   |
| `add-recently-viewed-issue`            | POST /api/v2/users/myself/recentlyViewedIssues  | Adds an issue to recently viewed issues           | `issueId` (required)                                                                                                                                                                                                                | [Link](https://developer.nulab.com/docs/backlog/api/2/add-recently-viewed-issue)            |
| `get-list-of-recently-viewed-projects` | GET /api/v2/users/myself/recentlyViewedProjects | Gets list of recently viewed projects             | `order` (optional), `offset` (optional), `count` (optional)                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-list-of-recently-viewed-projects) |
| `get-list-of-recently-viewed-wikis`    | GET /api/v2/users/myself/recentlyViewedWikis    | Gets list of recently viewed wikis                | `order` (optional), `offset` (optional), `count` (optional)                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-list-of-recently-viewed-wikis)    |
| `add-recently-viewed-wiki`             | POST /api/v2/users/myself/recentlyViewedWikis   | Adds a wiki to recently viewed wikis              | `wikiId` (required)                                                                                                                                                                                                                 | [Link](https://developer.nulab.com/docs/backlog/api/2/add-recently-viewed-wiki)             |
| `add-project-administrator`            | POST /api/v2/projects/:projectIdOrKey/administrators | Adds a project administrator                       | `projectIdOrKey` (required), `userId` (required)                                                                                                                                                                                    | [Link](https://developer.nulab.com/docs/backlog/api/2/add-project-administrator)            |
| `get-list-of-project-administrators`   | GET /api/v2/projects/:projectIdOrKey/administrators | Gets list of project administrators                | `projectIdOrKey` (required)                                                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-list-of-project-administrators)   |
| `delete-project-administrator`         | DELETE /api/v2/projects/:projectIdOrKey/administrators | Deletes a project administrator                    | `projectIdOrKey` (required), `userId` (required)                                                                                                                                                                                    | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-project-administrator)         |
| `add-status`                           | POST /api/v2/projects/:projectIdOrKey/statuses  | Adds a status to a project                        | `projectIdOrKey` (required), `name` (required), `color` (required)                                                                                                                                                                  | [Link](https://developer.nulab.com/docs/backlog/api/2/add-status)                           |
| `update-status`                        | PATCH /api/v2/projects/:projectIdOrKey/statuses/:id | Updates a status in a project                      | `projectIdOrKey` (required), `id` (required), `name` (required), `color` (required)                                                                                                                                                 | [Link](https://developer.nulab.com/docs/backlog/api/2/update-status)                        |
| `delete-status`                        | DELETE /api/v2/projects/:projectIdOrKey/statuses/:id | Deletes a status from a project                    | `projectIdOrKey` (required), `id` (required)                                                                                                                                                                                        | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-status)                        |
| `update-order-of-status`               | PATCH /api/v2/projects/:projectIdOrKey/statuses/order | Updates the order of statuses in a project         | `projectIdOrKey` (required), `statusIds` (required)                                                                                                                                                                                 | [Link](https://developer.nulab.com/docs/backlog/api/2/update-order-of-status)               |
| `get-issue-type-list`                  | GET /api/v2/projects/:projectIdOrKey/issueTypes | Gets issue type list of a project                  | `projectIdOrKey` (required)                                                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-issue-type-list)                  |
| `add-issue-type`                       | POST /api/v2/projects/:projectIdOrKey/issueTypes | Adds an issue type to a project                    | `projectIdOrKey` (required), `name` (required), `color` (required)                                                                                                                                                                  | [Link](https://developer.nulab.com/docs/backlog/api/2/add-issue-type)                       |
| `update-issue-type`                    | PATCH /api/v2/projects/:projectIdOrKey/issueTypes/:id | Updates an issue type in a project                 | `projectIdOrKey` (required), `id` (required), `name` (required), `color` (required)                                                                                                                                                 | [Link](https://developer.nulab.com/docs/backlog/api/2/update-issue-type)                    |
| `delete-issue-type`                    | DELETE /api/v2/projects/:projectIdOrKey/issueTypes/:id | Deletes an issue type from a project               | `projectIdOrKey` (required), `id` (required)                                                                                                                                                                                        | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-issue-type)                    |
| `get-category-list`                    | GET /api/v2/projects/:projectIdOrKey/categories | Gets category list of a project                    | `projectIdOrKey` (required)                                                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-category-list)                    |
| `add-category`                         | POST /api/v2/projects/:projectIdOrKey/categories | Adds a category to a project                       | `projectIdOrKey` (required), `name` (required)                                                                                                                                                                                      | [Link](https://developer.nulab.com/docs/backlog/api/2/add-category)                         |
| `update-category`                      | PATCH /api/v2/projects/:projectIdOrKey/categories/:id | Updates a category in a project                    | `projectIdOrKey` (required), `id` (required), `name` (required)                                                                                                                                                                     | [Link](https://developer.nulab.com/docs/backlog/api/2/update-category)                      |
| `delete-category`                      | DELETE /api/v2/projects/:projectIdOrKey/categories/:id | Deletes a category from a project                  | `projectIdOrKey` (required), `id` (required)                                                                                                                                                                                        | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-category)                      |
| `get-version-milestone-list`           | GET /api/v2/projects/:projectIdOrKey/versions   | Gets version/milestone list of a project           | `projectIdOrKey` (required)                                                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-version-milestone-list)           |
| `add-version-milestone`                | POST /api/v2/projects/:projectIdOrKey/versions  | Adds a version/milestone to a project              | `projectIdOrKey` (required), `name` (required), `description` (optional), `startDate` (optional), `releaseDueDate` (optional)                                                                                                       | [Link](https://developer.nulab.com/docs/backlog/api/2/add-version-milestone)                |
| `update-version-milestone`             | PATCH /api/v2/projects/:projectIdOrKey/versions/:id | Updates a version/milestone in a project           | `projectIdOrKey` (required), `id` (required), `name` (optional), `description` (optional), `startDate` (optional), `releaseDueDate` (optional), `archived` (optional)                                                               | [Link](https://developer.nulab.com/docs/backlog/api/2/update-version-milestone)             |
| `delete-version`                       | DELETE /api/v2/projects/:projectIdOrKey/versions/:id | Deletes a version/milestone from a project         | `projectIdOrKey` (required), `id` (required)                                                                                                                                                                                        | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-version)                       |
| `get-custom-field-list`                | GET /api/v2/projects/:projectIdOrKey/customFields    | Gets custom field list of a project                | `projectIdOrKey` (required)                                                                                                                                                                                                         | [Link](https://developer.nulab.com/docs/backlog/api/2/get-custom-field-list)                |
| `add-custom-field`                     | POST /api/v2/projects/:projectIdOrKey/customFields   | Adds a custom field to a project                   | `projectIdOrKey` (required), `typeId` (required), `name` (required), `description` (optional), `required` (optional), `applicableIssueTypes` (optional), `items` (optional), `allowInput` (optional), `min` (optional), `max` (optional), `initial` (optional), `unit` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/add-custom-field)                     |
| `update-custom-field`                  | PATCH /api/v2/projects/:projectIdOrKey/customFields/:id | Updates a custom field in a project              | `projectIdOrKey` (required), `id` (required), `name` (optional), `description` (optional), `required` (optional), `applicableIssueTypes` (optional), `items` (optional), `allowInput` (optional), `min` (optional), `max` (optional), `initial` (optional), `unit` (optional) | [Link](https://developer.nulab.com/docs/backlog/api/2/update-custom-field)                  |
| `delete-custom-field`                  | DELETE /api/v2/projects/:projectIdOrKey/customFields/:id | Deletes a custom field from a project           | `projectIdOrKey` (required), `id` (required)                                                                                                                                                                                        | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-custom-field)                  |
| `add-list-item-for-list-type-custom-field` | POST /api/v2/projects/:projectIdOrKey/customFields/:id/items | Adds a list item to a list type custom field  | `projectIdOrKey` (required), `id` (required), `name` (required)                                                                                                                                                                     | [Link](https://developer.nulab.com/docs/backlog/api/2/add-list-item-for-list-type-custom-field) |
| `update-list-item-for-list-type-custom-field` | PATCH /api/v2/projects/:projectIdOrKey/customFields/:id/items/:itemId | Updates a list item in a list type custom field | `projectIdOrKey` (required), `id` (required), `itemId` (required), `name` (required)                                                                                                                                               | [Link](https://developer.nulab.com/docs/backlog/api/2/update-list-item-for-list-type-custom-field) |
| `delete-list-item-for-list-type-custom-field` | DELETE /api/v2/projects/:projectIdOrKey/customFields/:id/items/:itemId | Deletes a list item from a list type custom field | `projectIdOrKey` (required), `id` (required), `itemId` (required)                                                                                                                                                                  | [Link](https://developer.nulab.com/docs/backlog/api/2/delete-list-item-for-list-type-custom-field) |
| `get-list-of-shared-files`            | GET /api/v2/projects/:projectIdOrKey/files/metadata   | Gets list of shared files in a project            | `projectIdOrKey` (required), `path` (optional)                                                                                                                                                                                       | [Link](https://developer.nulab.com/docs/backlog/api/2/get-list-of-shared-files)            |
| `get-file`                            | GET /api/v2/projects/:projectIdOrKey/files/:path      | Gets a file from the project                      | `projectIdOrKey` (required), `path` (required)                                                                                                                                                                                       | [Link](https://developer.nulab.com/docs/backlog/api/2/get-file)                            |

### Implementation Pattern

For adding new Backlog API endpoints:

1. Create a function in `src/backlog-api/` folder with appropriate naming
2. Use consistent error handling with axios
3. Register the API as an MCP tool in `src/index.ts`
4. Follow the existing parameter passing patterns

### Naming Conventions

To maintain consistency across the codebase, follow these naming conventions:

1. **MCP Tool Names**: Use kebab-case that exactly matches the API documentation URL ending

   - Tool names must mirror the end part of the API documentation URL (e.g., `get-recent-updates`, `get-activity`, `add-issue`)
   - For all GET operations: always use the `get-` prefix as shown in documentation
   - Example: If the API documentation URL is `https://developer.nulab.com/docs/backlog/api/2/get-user-list`,
     the tool name should be `get-user-list`
   - For POST, PUT, PATCH, DELETE: use the prefix from documentation (`add-`, `update-`, `delete-`)

2. **File Names**: Match MCP Tool Names exactly

   - File names should be identical to MCP Tool Names, with `.ts` extension (e.g., `get-user-list.ts`)
   - This ensures direct mapping between documented APIs, file names, and tool names
   - When renaming files, ensure you update all imports in `index.ts` and adjust function references

3. **Function Names**: Use camelCase with matching action prefix

   - Function names should mirror the tool name but in camelCase
   - Example: for tool `get-user-list`, use function name `getUserList`
   - For GET operations: always use `get` prefix
   - For POST operations: use `add` or `create` prefix to match documentation
   - For PUT/PATCH operations: use `update` prefix
   - For DELETE operations: use `delete` prefix

4. **URL Validation**:
   - Always verify that API documentation URLs exist before using them in documentation
   - If English documentation is unavailable, use Japanese version (but note this in comments)
   - Preferred URL pattern: `https://developer.nulab.com/docs/backlog/api/2/[endpoint-name]`
   - Many endpoints have URLs that end with `-list` even though the endpoint path doesn't contain "list"

### File Renaming and Updates Procedure

When updating file names to match API documentation:

1. **Check Documentation First**:

   - Verify the correct API documentation URL at https://developer.nulab.com/docs/backlog/
   - Determine the correct tool and file name that should be used

2. **Create New Files Instead of Renaming**:

   - Create a new file with the correct name (copying content from the old file)
   - Update the function name in the new file if needed
   - Make sure to preserve all function logic and error handling

3. **Update Index.ts References**:

   - Update imports to point to the new files
   - Update MCP Tool Registration to use the new tool name
   - Keep the function parameters and logic the same

4. **Clean Up**:

   - After verifying everything works, remove old files
   - Use `git rm [old-file]` to tell Git to track the deletion
   - Use `git add [new-file]` to stage the new file

5. **Testing**:
   - Run `npm run typecheck` to ensure there are no TypeScript errors
   - Test the modified endpoints to ensure they function correctly

### API Documentation Reference

Official Backlog API documentation:

- English: https://developer.nulab.com/docs/backlog/ (Basically refer to English documentation)
- Japanese: https://developer.nulab.com/ja/docs/backlog/
