# Changelog

All notable changes to this project will be documented in this file.

## [v2.0.0] - 2025-10-31
### Added
- Initial release of the editable Sibi Advisory website built with Next.js (App Router, TypeScript) and Strapi CMS.
- Added content models in Strapi for navbar, hero, about, services, metrics, and contact sections.
- Implemented PostgreSQL database and Docker Compose configuration for local development.
- Added REST endpoints (proxy functions) to fetch content from the CMS to the frontend.
- Implemented a contact API route that sends form submissions via SMTP.

### Deployment
- Added a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automate building and deploying the website and CMS.
- Added `.env.example` with required environment variable placeholders.
- Added `docs/README-SETUP.md` to document setup and deployment steps.

### Future roadmap
- **v2.1.0**: Internationalization (locale-based fields and language switcher).
- **v2.2.0**: Draft-review-publish workflow in the CMS and content version history.
- **v2.3.0**: Additional modules (Insights/Blog), RSS feeds, and automated OpenGraph image generation.
