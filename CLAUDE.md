# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development**
```bash
bun dev              # Start dev server on port 3000
bun build            # Type check and build for production
bun preview          # Preview production build
```

**Code Quality**
```bash
bun lint             # Run ESLint
bun check-types      # Run TypeScript type checking
bun format           # Format code with Prettier
bun format:check     # Check code formatting
bun ci               # Run all checks (format, lint, type check)
```

## Architecture

**Domain-Driven Structure**

The codebase follows a domain-driven architecture under `src/domain/`:

- `identity/` - Authentication and user management
  - `auth/` - Session management, sign-in/sign-up logic
  - `user/` - User entities and types
- `communication/` - Real-time communication features
  - `topic/` - Topic/channel management with real-time user presence
- `infra/` - Infrastructure concerns
  - `api/` - HTTP API client wrapper
  - `ws/` - WebSocket connection management
- `ui/` - UI components
  - `cn/` - shadcn/ui based components
  - `components/` - Custom UI fragments and widgets

Each domain follows a consistent structure:
- `store.ts` - Zustand state management
- `service.ts` - API/business logic
- `listener.ts` - WebSocket event handlers
- `dtos.ts` - Data transfer object schemas
- `utils/` - Types, schemas, constants, helpers
- `ui/` - Domain-specific UI components

**State Management**

Uses Zustand stores:
- `useSessionStore` - Authentication session state (src/domain/identity/auth/store.ts)
- `useWebSocketStore` - WebSocket connection lifecycle (src/domain/infra/ws/store.ts)
- `useTopicStore` - Topic data with Immer for immutable Map updates (src/domain/communication/topic/store.ts)

**WebSocket Event System**

Centralized event handling in `src/domain/infra/ws/store.ts`:
1. Events are parsed and validated with Zod schemas
2. Dispatched to domain-specific listeners via `WEBSOCKET_EVENTS_DECLARATION`
3. Domains register their events in `utils/constants.ts` (e.g., `TOPIC_EVENTS_DECLARATION`)
4. Listeners update Zustand stores based on event data

To add new WebSocket events:
1. Define event type in domain's `utils/types.ts`
2. Create listener function in domain's `listener.ts`
3. Register in domain's `utils/constants.ts` event declaration
4. Import into `src/domain/infra/ws/utils/constants.ts`

**Routing & Auth**

React Router 7 with nested layouts in `src/app/router.tsx`:
- `<Auth />` wrapper handles session checking
- `<PublicLayout />` for unauthenticated routes (/sign-in, /sign-up)
- `<ProtectedLayout />` for authenticated routes (/)

**API Client**

Simplified REST client in `src/domain/infra/api.ts` provides `api.get`, `api.post`, `api.put`, `api.delete` methods. Uses `callApi` helper to build API URLs and handle requests.

**Path Alias**

TypeScript path alias `@/*` maps to `src/*` (configured in tsconfig.json and vite.config.ts).

**Tech Stack**

- React 19 with React Compiler (babel-plugin-react-compiler)
- Vite (using Rolldown fork for faster builds)
- Tailwind CSS 4 + shadcn/ui components
- Zustand + Immer for state
- Zod for runtime validation
- ReconnectingWebSocket for resilient WebSocket connections
