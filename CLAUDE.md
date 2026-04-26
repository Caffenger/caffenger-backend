# Caffenger Backend

Ignore: **/node_modules/**, **/dist/**, **/test-results/**, **/coverage/**, **/.git/**, **/*.log**, **/docker-volumes/**
Ignore: **/migrations/**

## Stack
- NestJS
- Prisma ORM
- PostgreSQL 17 Alpine
- ConfigService for environment variables

## Commands
```bash
npm run dev          # nest start --watch
npm run generate     # npx prisma generate
npx prisma migrate dev --name <migration_name>
```

## Structure
```
.
├── prisma
├── src
│   ├── core
│   │   └── decorators
│   ├── features
│   │   ├── auth
│   │   │   ├── dto
│   │   │   ├── guards
│   │   │   ├── strategies
│   │   │   └── types
│   │   ├── bill
│   │   ├── cafe
│   │   │   └── dto
│   │   ├── cafe-object
│   │   │   └── types
│   │   ├── canvas
│   │   │   └── types
│   │   ├── floor
│   │   │   └── types
│   │   ├── menu
│   │   │   └── dtos
│   │   ├── menu-item
│   │   │   └── dtos
│   │   ├── table
│   │   └── users
│   │       └── dto
│   ├── generated
│   │   └── prisma
│   │       ├── internal
│   │       └── models
│   ├── lib
│   │   └── prisma
│   └── utils
└── test

```

## Conventions
- CORS origin from `CAFFENGER_FRONTEND_URL` env var
- Non-auth routes use guards for authentication
- ValidationPipe with whitelist and forbidNonWhitelisted globally applied
- Prisma schema is the single source of truth for all data shapes
- Soft deletes via `deletedAt` DateTime field on all major models

## Prisma
- Models with soft delete: User, Cafe, CafeStaff, CafeFloor, Canvas, Menu, MenuItem, Bill
- CafeObject and Table are 1:1 — enforced by @unique on cafeObjectId
- ObjectTypeEnum values: TABLE, SEAT, WALL, ROOM

