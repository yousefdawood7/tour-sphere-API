<h1 align="center">
  🌍 TourSphere API
</h1>

<p align="center">
  A lightweight, type-safe REST API built with <a href="https://expressjs.com" target="_blank">Express 5</a> and <a href="https://www.typescriptlang.org" target="_blank">TypeScript</a>.
</p>

<p align="center">
  <img alt="Express" src="https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Zod" src="https://img.shields.io/badge/Zod-4.x-3E67B1?style=flat-square" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-10-F69220?style=flat-square&logo=pnpm&logoColor=white" />
</p>

---

## Overview

**TourSphere API** is the backend REST API for the TourSphere platform. It is built with **Express 5** and **TypeScript** and provides a clean, production-ready server foundation with runtime environment validation, structured logging, and security-first middleware out of the box.

---

## Tech Stack

| Tool | Purpose |
| ---- | ------- |
| [Express 5](https://expressjs.com) | HTTP server framework |
| [TypeScript 5.8](https://www.typescriptlang.org) | Static typing |
| [Zod 4](https://zod.dev) | Runtime schema & env validation |
| [@t3-oss/env-core](https://env.t3.gg) | Type-safe environment variables |
| [Helmet](https://helmetjs.github.io) | HTTP security headers |
| [Morgan](https://github.com/expressjs/morgan) | Request logging |
| [CORS](https://github.com/expressjs/cors) | Cross-origin request handling |
| [esbuild](https://esbuild.github.io) | Production bundler |
| [tsx](https://tsx.is) | TypeScript runner for development |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v10+

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
APP_STAGE=dev
NODE_ENV=development
```

All variables are validated at startup using **Zod v4** via `@t3-oss/env-core`. The server will throw and refuse to start if any variable is missing or invalid:

```typescript
export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3000),            // number  — defaults to 3000
    APP_STAGE: z.enum(['dev', 'production']),          // 'dev' | 'production'
    NODE_ENV: z.enum(['development', 'production']),   // 'development' | 'production'
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
```

> **Note:** The `.env` file is only loaded when `APP_STAGE=dev`. In production, variables are expected to be injected by the host environment.

### Running the Server

```bash
# Development — with hot-reload
pnpm dev

# Production
pnpm build
pnpm start
```

The API will be available at `http://localhost:3000` by default.

---

## Project Structure

```
src/
├── app.ts          # Express app — middleware stack and route registration
├── server.ts       # Entry point — starts the HTTP server
│
└── lib/
    └── env.ts      # Validated, typed environment config
```

---

## Scripts

| Command | Description |
| ------- | ----------- |
| `pnpm dev` | Start the dev server with hot-reload |
| `pnpm build` | Bundle for production with esbuild |
| `pnpm start` | Run the production bundle |
| `pnpm lint` | Lint source files |
| `pnpm lint:fix` | Lint and auto-fix |
