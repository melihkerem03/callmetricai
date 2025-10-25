# CallMetricAI - Turborepo Monorepo

A complete monorepo setup with Turborepo, Next.js apps, NestJS API, and shared packages.

## Architecture

- **apps/web**: Landing page + info subdomain (Next.js)
- **apps/app**: Customer panel (Next.js) 
- **apps/admin**: Admin panel (Next.js)
- **apps/api**: Backend API (NestJS + Prisma + PostgreSQL)
- **packages/types**: Shared TypeScript types
- **packages/db**: Prisma database client
- **packages/ui**: Shared UI components
- **packages/api-sdk**: Auto-generated API client

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker (for local PostgreSQL)

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start PostgreSQL (Docker):**
   ```bash
   docker compose -f infra/docker/docker-compose.yml up -d
   ```

3. **Set up database:**
   ```bash
   # Copy environment file
   cp env.example .env
   
   # Generate Prisma client
   pnpm --filter @db/client generate
   
   # Run migrations (when database is running)
   pnpm --filter @db/client migrate
   ```

4. **Start development servers:**
   ```bash
   # Start all apps in parallel
   pnpm dev
   
   # Or start individually:
   pnpm --filter apps/api dev     # API on :4000
   pnpm --filter apps/web dev     # Web on :3000
   pnpm --filter apps/app dev     # App on :3001
   pnpm --filter apps/admin dev   # Admin on :3002
   ```

## Environment Setup

Create `.env` file in root:
```env
DATABASE_URL="postgresql://cm:cm@localhost:5432/cmdb?schema=public"
```

Create `apps/web/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## API Documentation

Once the API is running, visit:
- Swagger UI: http://localhost:4000/docs
- Health check: http://localhost:4000/health

## Subdomain Routing

The web app supports subdomain routing:
- `localhost:3000` → Main landing page
- `info.localhost:3000` → Info page (via middleware)

## Available Scripts

- `pnpm dev` - Start all apps in development
- `pnpm build` - Build all apps
- `pnpm typecheck` - Type check all packages
- `pnpm lint` - Lint all packages
- `pnpm test` - Run all tests

## Package Scripts

Each package has its own scripts:
- `pnpm --filter @db/client generate` - Generate Prisma client
- `pnpm --filter @db/client migrate` - Run database migrations
- `pnpm --filter @api-sdk/client generate` - Generate API client from OpenAPI

## Deployment

### DNS Configuration (Cloudflare)
- `@` → Vercel (apps/web)
- `info` → Vercel (apps/web) 
- `app` → Vercel (apps/app)
- `admin` → Vercel (apps/admin)
- `api` → Render/Railway (apps/api)

### Environment Variables
- API CORS: `https://*.callmetricai.com`
- Auth cookie domain: `.callmetricai.com`

## Development Notes

- All apps share the same TypeScript configuration via `tsconfig.base.json`
- Shared packages are linked via workspace dependencies
- API client is auto-generated from OpenAPI spec
- Database schema is managed via Prisma migrations
- Subdomain routing handled by Next.js middleware

## Troubleshooting

1. **Database connection issues**: Ensure PostgreSQL is running via Docker
2. **API client not generated**: Run `pnpm --filter @api-sdk/client generate`
3. **Type errors**: Run `pnpm typecheck` to identify issues
4. **Build failures**: Check individual package builds with `pnpm --filter <package> build`
