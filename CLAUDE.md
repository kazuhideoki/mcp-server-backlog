# CLAUDE.md

## Build & Development Commands
```bash
# Install dependencies
npm install

# Run tests (not yet implemented)
npm test

# Lint (add ESLint when needed)
# npm run lint

# Typecheck (add TypeScript when needed)
# npm run typecheck
```

## Code Style Guidelines
- **Naming**: camelCase for variables/functions, PascalCase for classes
- **Imports**: Group imports by external libraries, then internal modules
- **Formatting**: 2-space indentation, trailing commas in multiline objects/arrays
- **Types**: Use TypeScript when possible, prefer strict typing
- **Error Handling**: Always catch and properly handle errors, avoid silent failures
- **Documentation**: JSDoc for functions, inline comments for complex logic

## Project Structure
This project uses the Model Context Protocol SDK. Follow its conventions when extending.