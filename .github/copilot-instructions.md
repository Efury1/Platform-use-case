# Copilot Instructions for Dev Dump

## Big Picture Architecture
- **Monorepo** with `backend` (Fastify/Prisma) and `frontend` (Vite/Sass 7-1) folders. Each is independently runnable and has its own `package.json`.
- **Backend**: Node.js server using Fastify, Zod for validation, Prisma for database ORM (Postgres). Entry: `src/server.js`. Data models in `prisma/schema.prisma`.
- **Frontend**: Vite-powered dev environment, Sass 7-1 architecture for styles. Entry: `src/main.js`, root Sass: `src/main.scss`.

## Developer Workflows
### Backend
- **Install**: `npm install` in `backend/`
- **Run server**: `npx nodemon src/server.js` (auto-restarts on changes)
- **Prisma DB**:
  - Start local Prisma/Postgres: `prisma dev`
  - Define models: edit `prisma/schema.prisma`
  - Migrate DB: `npx prisma migrate dev`
- **Validation**: Use Zod schemas for params, query, body. Place reusable validators in a shared module.
- **Error Handling**: Prefer Fastify's global error handler for async errors.

### Frontend
- **Install**: `npm install` in `frontend/`
- **Dev server**: `npm run dev` (Vite, hot reload, serves at `localhost:5173`)
- **Build**: `npm run build` (outputs to `/dist`)
**Sass 7-1**: Place new styles in the correct folder (`abstracts`, `base`, `components`, etc.).
  - Use `@use` and `@forward` for loading and sharing Sass modules, not `@import`.
  - Each folder should contain a main file (e.g., `_index.scss`) that forwards all partials in that folder.
  - In `main.scss`, use only `@use` to load each folder's main file.

## Project-Specific Patterns
- **Backend**:
  - Use Zod for all input validation; infer types from schemas.
  - Organize routes and plugins modularly in Fastify.
  - Prisma models must be migrated after schema changes.
  
- **Frontend**:
  - Strictly follow the 7-1 Sass architecture:
    - `abstracts/`: variables, mixins, functions (use `@forward` in `_index.scss`)
    - `base/`: resets, typography, global styles
    - `components/`: UI elements (buttons, cards, etc.)
    - `layout/`: grid, header, footer, sections
    - `pages/`: page-specific styles
    - `themes/`: theme files (light/dark)
    - `vendors/`: third-party overrides
  - Use `@use` and `@forward` for all Sass modules; do not use `@import`.
  - Only use Vite dev server for local development.

## Integration Points
- **Backend/Frontend**: No direct coupling; communicate via HTTP APIs (define endpoints in Fastify).
- **Database**: Prisma manages migrations and client access; always update schema and run migrations before using new models.

## Key Files & Directories
- `backend/src/server.js`: Fastify server entry
- `backend/prisma/schema.prisma`: DB models
- `frontend/src/main.js`: Vite entry
- `frontend/src/main.scss`: Sass root
- `frontend/src/abstracts/`, `base/`, `components/`, etc.: Sass 7-1 folders

## Example Patterns
- **Zod validation**:
  ```js
  const schema = z.object({ ... });
  fastify.post('/route', { schema: { body: schema } }, handler);
  ```
**Sass module usage**:
  ```scss
  // abstracts/_index.scss
  @forward 'variables';
  @forward 'mixins';
  @forward 'functions';

  // base/_index.scss
  @forward 'reset';
  @forward 'typography';

  // src/main.scss
  @use 'abstracts';
  @use 'base';
  @use 'components';
  @use 'layout';
  @use 'pages';
  @use 'themes';
  @use 'vendors';
  ```


