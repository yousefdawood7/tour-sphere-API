<h1 align="center">
  🌍 TourSphere API
</h1>

<p align="center">
  A lightweight, type-safe REST API built with <a href="https://expressjs.com" target="_blank">Express 5</a> and <a href="https://www.typescriptlang.org" target="_blank">TypeScript</a> — designed as the backend backbone for the TourSphere platform.
</p>

<p align="center">
  <img alt="Express" src="https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Zod" src="https://img.shields.io/badge/Zod-4.x-3E67B1?style=flat-square" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-10-F69220?style=flat-square&logo=pnpm&logoColor=white" />
</p>

---

## 📖 Overview

**TourSphere API** is a backend REST API built with **Express 5** and **TypeScript**. It provides a clean, type-safe server foundation with runtime environment validation and security-first middleware — ready to be extended with full feature modules for the TourSphere platform.

Key highlights:

- ✅ **Express 5** — The latest major release with improved async error handling out of the box
- ✅ **Zod v4 env validation** — Environment variables validated at startup via `@t3-oss/env-core`, preventing misconfigured deployments
- ✅ **Security-first middleware** — `helmet` and `cors` configured by default on every request
- ✅ **Type-safe TypeScript** — Strict mode with `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, and `verbatimModuleSyntax`
- ✅ **esbuild** — Blazing-fast production bundling targeting Node.js 24

---

## 🏗️ Project Structure

```
src/
├── app.ts          # Express app setup — middleware stack and base routes
├── server.ts       # Entry point — binds the app to the configured port
│
└── lib/
    └── env.ts      # Typed, validated environment config (t3-oss/env-core + Zod)
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v10+

### Installation

```bash
pnpm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
PORT=3000
APP_STAGE=dev
NODE_ENV=development
```

| Variable    | Values                  | Description                              |
| ----------- | ----------------------- | ---------------------------------------- |
| `PORT`      | Any number (default `3000`) | Port the HTTP server listens on      |
| `APP_STAGE` | `dev` \| `production`   | Controls whether `.env` file is loaded   |
| `NODE_ENV`  | `development` \| `production` | Node runtime environment           |

### Running the Server

```bash
# Development (with hot-reload)
pnpm dev

# Production
pnpm start
```

The server starts on **`http://localhost:3000`** by default.

---

## 🛠️ Tech Stack

| Tool                                                    | Purpose                         |
| ------------------------------------------------------- | ------------------------------- |
| [Express 5](https://expressjs.com)                      | HTTP server framework           |
| [TypeScript 5.8](https://www.typescriptlang.org)        | Type safety                     |
| [Zod 4](https://zod.dev)                                | Runtime schema validation       |
| [@t3-oss/env-core](https://env.t3.gg)                   | Type-safe environment variables |
| [Helmet](https://helmetjs.github.io)                    | HTTP security headers           |
| [CORS](https://github.com/expressjs/cors)               | Cross-origin request handling   |
| [Morgan](https://github.com/expressjs/morgan)           | HTTP request logging            |
| [esbuild](https://esbuild.github.io)                    | Fast production bundler         |
| [tsx](https://tsx.is)                                   | TypeScript execution for dev    |
| [ESLint](https://eslint.org) + [Prettier](https://prettier.io) | Linting & formatting   |

---

## ✨ Architecture Highlights

### Validated Environment at Startup

Instead of reading raw `process.env` values at runtime, all environment variables are declared as a typed schema using `@t3-oss/env-core` and **Zod v4**. If a required variable is missing or has an invalid value, the process throws immediately on startup — no silent misconfigurations.

```ts
export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3000),
    APP_STAGE: z.enum(['dev', 'production']),
    NODE_ENV: z.enum(['development', 'production']),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
```

### Stage-Aware `.env` Loading

`dotenv` is only invoked in development (`APP_STAGE=dev`). In production, environment variables are expected to be injected by the host — keeping the runtime clean and 12-factor compliant.

```ts
if (isDevelopment) dotenv.config();
```

---

## 🔧 Available Scripts

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `pnpm dev`     | Start dev server with hot-reload (`tsx`) |
| `pnpm build`   | Bundle for production with esbuild       |
| `pnpm start`   | Run the compiled production bundle       |
| `pnpm lint`    | Lint source files with ESLint            |
| `pnpm lint:fix`| Lint and auto-fix with ESLint            |

---

## 📄 License

This project is private and unlicensed.
