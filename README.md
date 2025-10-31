# SiBi Strategic Advisory CMS

This project upgrades the original static website into a Next.js driven CMS with an integrated admin dashboard.

## Getting Started

1. Install dependencies and generate the Prisma client:

   ```bash
   npm install
   npm run prisma:generate
   ```

2. Apply database migrations (SQLite by default) and seed initial content:

   ```bash
   npx prisma migrate deploy
   npm run prisma:seed
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The website is available at `http://localhost:3000` and the admin dashboard at `http://localhost:3000/admin`.

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed.

- `DATABASE_URL` – Prisma database connection string.
- `JWT_SECRET` – Secret for signing authentication tokens.
- `ADMIN_PASSWORD` – Seed password for the default admin user.

## Features

- Editable hero, about, services, metrics, and contact sections.
- JWT-secured admin dashboard with card-based editing and toast notifications.
- Markdown support for service descriptions.
- Contact form that stores submissions in the database.
- API endpoints for `/api/v1/content`, `/api/v1/auth`, and `/api/v1/contact`.

## Continuous Deployment

This repository ships with a GitHub Actions workflow that builds the application and
publishes a production-ready Docker image to the GitHub Container Registry whenever
you push to `main`.

1. In your GitHub repository settings, add a `DATABASE_URL` secret that points to your
   production database (for example, a managed PostgreSQL instance).
2. Optionally add `ADMIN_PASSWORD` and `JWT_SECRET` secrets so the container starts
   with the desired credentials.
3. Push to `main` or run the `Deploy` workflow manually. The resulting container image
   will be tagged as `ghcr.io/<owner>/<repo>:main`.
4. Deploy that image to your preferred platform (Render, Fly.io, AWS ECS, etc.) using
   the sample configuration below.

### Example Render blueprint

```yaml
services:
  - type: web
    name: sibi-advisory
    env: docker
    plan: starter
    dockerfilePath: Dockerfile
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: ADMIN_PASSWORD
        sync: false
```

After the Render service is connected to your GitHub repository, each successful run of
the `Deploy` workflow will refresh the live container. A typical production endpoint
would look like `https://sibi-advisory.onrender.com/` once the Render service is live.

## Versioning

The project follows semantic versioning. See [`CHANGELOG.md`](./CHANGELOG.md) for a
history of notable changes. The current release is **v1.1.0**.
