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
