# README-SETUP

## Local development

1. Clone this repository.
2. Copy `.env.example` to `.env` and fill in the required environment variables (CMS_URL, CMS_API_TOKEN, VERCEL_TOKEN, RENDER_API_KEY, POSTGRES_PASSWORD, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO).
3. Install Docker and Docker Compose on your machine.
4. Run `docker-compose up -d` in the project root to start PostgreSQL and Strapi CMS.
5. Navigate to the `web` directory, install dependencies and start the Next.js development server:

   ```bash
   cd web
   npm install
   npm run dev
   ```

## Deployment

### CMS (Strapi)

1. Deploy the Strapi CMS in the `cms` directory to a hosting provider like Render or DigitalOcean.
2. Use a PostgreSQL database (e.g., via Docker or a managed service) and set the corresponding environment variables.
3. Set up the `CMS_URL` and `CMS_API_TOKEN` for the frontend to access your CMS content.

### Frontend (Next.js)

1. Deploy the `web` directory to Vercel or another static hosting platform.
2. Configure environment variables (CMS_URL, CMS_API_TOKEN, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO) in the deployment settings.
3. A GitHub Actions workflow in `.github/workflows/deploy.yml` can automate the build and deployment process on pushes to `main`.

## Seeds and Administration

1. After launching Strapi, access the admin panel to create an administrator account.
2. Use the admin UI to input or import seed data defined in your specification (navbar, hero, about, services, metrics, contact).
3. You can also create additional collection entries for services as your business grows.

## Contact Form

The contact form in the frontend sends submissions via SMTP using the credentials defined in your environment variables. In development mode, emails can be logged to the console instead of sent.
