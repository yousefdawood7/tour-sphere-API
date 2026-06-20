<h1 align="center">
  🌍 TourSphere API
</h1>

<p align="center">
  A lightweight, type-safe REST API built with <a href="https://expressjs.com" target="_blank">Express 5</a> and <a href="https://www.typescriptlang.org" target="_blank">TypeScript</a>.
</p>

<p align="center">
  <img alt="Express" src="https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-9.x-880000?style=flat-square&logo=mongoose&logoColor=white" />
  <img alt="Zod" src="https://img.shields.io/badge/Zod-4.x-3E67B1?style=flat-square" />
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-10-F69220?style=flat-square&logo=pnpm&logoColor=white" />
</p>

---

## Overview

**TourSphere API** is the backend REST API for the TourSphere platform — a tour-booking application. It is built with **Express 5**, **TypeScript**, and **MongoDB** (via **Mongoose**) and provides a clean, production-ready server foundation with:

- 🗄️ MongoDB Atlas database integration
- 🧩 Modular architecture with dependency injection (tsyringe)
- 🔐 JWT-based authentication (signup & login) with bcrypt password hashing
- ✅ Runtime request validation (Zod v4)
- 🛡️ Structured global error handling with operational vs. programming error distinction
- 🔍 Advanced query features — filtering, sorting, field selection & pagination
- 🔒 Security-first middleware (Helmet, CORS)
- 📝 Structured request logging (Morgan)
- 🌱 Database seeding script

---

## Tech Stack

| Tool | Purpose |
| ---- | ------- |
| [Express 5](https://expressjs.com) | HTTP server framework |
| [TypeScript 5.8](https://www.typescriptlang.org) | Static typing |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |
| [Mongoose 9](https://mongoosejs.com) | MongoDB ODM — schemas, models, hooks |
| [Zod 4](https://zod.dev) | Runtime schema & request validation |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | JWT token signing & verification |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [@t3-oss/env-core](https://env.t3.gg) | Type-safe environment variables |
| [tsyringe](https://github.com/microsoft/tsyringe) | Dependency injection container |
| [slugify](https://github.com/simov/slugify) | URL-friendly slug generation |
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
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or a local MongoDB instance)

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

DATABASE_NAME=<your-db-user>
DATABASE_PASSWORD=<your-db-password>
DATABASE_URL=mongodb+srv://<user>:<PASSWORD>@<cluster>.mongodb.net/?appName=<app>

JWT_SECRET=<min-32-character-secret>
JWT_EXPIRES_IN=1d
BCRYPT_ROUNDS=12
```

All variables are validated at startup using **Zod v4** via `@t3-oss/env-core`. The server will throw and refuse to start if any variable is missing or invalid:

```typescript
export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3000),
    APP_STAGE: z.enum(['dev', 'production']),
    NODE_ENV: z.enum(['development', 'production']),

    DATABASE_NAME: z.string().min(3).max(128),
    DATABASE_PASSWORD: z.string().min(3).max(128),
    DATABASE_URL: z.url(),

    BCRYPT_ROUNDS: z.coerce.number().min(12).max(31).default(12),
    JWT_SECRET: z.string().min(32).max(256),
    JWT_EXPIRES_IN: z.union([
      z.number().positive(),
      z.string().regex(/^\d+(s|m|h|d|w|y)$/).default('1d'),
    ]),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
```

> **Note:** The `.env` file is only loaded when `APP_STAGE=dev`. In production, variables are expected to be injected by the host environment.

### Running the Server

```bash
# Development — with hot-reload
pnpm start:dev

# Production
pnpm build
pnpm start
```

The API will be available at `http://localhost:3000` by default.

### Seeding the Database

```bash
pnpm seed
```

Populates the database with sample tour data from `dev-data/data/`.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `POST` | `/auth/signup` | Register a new user (returns JWT) |
| `POST` | `/auth/login` | Authenticate an existing user (returns JWT) |

#### Signup Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Secret1234",
  "confirmPassword": "Secret1234",
  "avatar": "https://example.com/avatar.jpg"  // optional
}
```

#### Login Request Body

```json
{
  "email": "john@example.com",
  "password": "Secret1234"
}
```

**Password requirements:** minimum 8 characters, at least one uppercase letter, one lowercase letter, and one digit.

### Tours

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `GET` | `/tours` | Get all tours (supports filtering, sorting, field selection & pagination) |
| `GET` | `/tours/:id` | Get a single tour by ID |
| `POST` | `/tours` | Create a new tour |
| `GET` | `/tours/stats` | Get aggregated tour statistics (avg price, ratings, etc.) |
| `GET` | `/tours/busiest/:year` | Get the busiest months for tours in a given year |

### Query Features

All list endpoints support the following query parameters:

| Parameter | Example | Description |
| --------- | ------- | ----------- |
| **Filter** | `?difficulty=easy&price[gte]=500` | Filter by field values using MongoDB operators |
| **Sort** | `?sort=price,-ratingsAverage` | Sort by one or more fields (prefix with `-` for descending) |
| **Fields** | `?fields=name,price,summary` | Select specific fields to return |
| **Page** | `?page=2&limit=10` | Paginate results |

---

## Error Handling

The API uses a centralized error handling strategy:

- **`APIError`** class — custom operational errors with status codes and optional detail objects
- **Global error middleware** — catches all errors and returns structured JSON responses
  - In `dev`: full error details including stack trace
  - In `production`: only operational error messages are exposed to clients
- **MongoDB-specific handlers** — automatically maps Mongoose `ValidationError`, `CastError` (invalid ObjectId), and duplicate key errors (code `11000`) to meaningful API responses
- **Zod validation middleware** — validates request body, query params, and route params before they reach controllers
- **Unhandled rejection handler** — gracefully shuts down the server on uncaught promise rejections

---

## Project Structure

```
src/
├── app.ts                              # Express app — middleware stack & route registration
├── server.ts                           # Entry point — DB connection & HTTP server bootstrap
│
├── config/
│   ├── constants.config.ts             # App-wide constants (defaults, special query filters)
│   ├── db.config.ts                    # MongoDB/Mongoose connection
│   ├── error-codes.config.ts           # MongoDB error → APIError mappers
│   └── error.config.ts                 # Error configuration
│
├── lib/
│   └── env.ts                          # Validated, typed environment config
│
├── middlewares/
│   ├── global-error.middleware.ts       # Centralized error handler
│   └── zod-validation.middleware.ts     # Request validation (body/query/params)
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts          # Signup & login route handlers
│   │   ├── auth.model.ts              # Mongoose User schema & model (bcrypt hooks)
│   │   ├── auth.routes.ts             # Auth router (/auth/signup, /auth/login)
│   │   ├── auth.schema.ts            # Zod schemas for signup & login validation
│   │   └── auth.service.ts           # Authentication business logic
│   │
│   └── tours/
│       ├── aggregations/
│       │   └── tours.pipeline.ts       # Aggregation pipelines (stats, busiest month)
│       ├── tour.controller.ts          # Route handlers
│       ├── tour.model.ts               # Mongoose schema & model (hooks, virtuals)
│       ├── tour.routes.ts              # Express router
│       ├── tour.schema.ts              # Zod schemas for request validation
│       └── tour.service.ts             # Business logic layer
│
├── schemas/
│   └── query.schema.ts                 # Shared query string schema (sort, fields, page, limit)
│
├── scripts/
│   └── seed.ts                         # Database seeding script
│
└── utils/
    ├── api-error.ts                    # APIError class
    ├── api-features.ts                 # Query builder (filter, sort, fields, paginate)
    ├── jwt-token.ts                    # JWT sign & verify utility
    ├── split-commas.ts                 # Comma-separated string → array utility
    ├── types.ts                        # Shared type definitions
    └── zod-utils.ts                    # Zod helper utilities
```

---

## Scripts

| Command | Description |
| ------- | ----------- |
| `pnpm start:dev` | Start the dev server with hot-reload (build + watch) |
| `pnpm build` | Bundle for production with esbuild |
| `pnpm build:watch` | Bundle in watch mode |
| `pnpm start` | Run the production bundle |
| `pnpm start:watch` | Run the production bundle in watch mode |
| `pnpm seed` | Seed the database with sample tour data |
| `pnpm lint` | Lint source files |
| `pnpm lint:fix` | Lint and auto-fix |
