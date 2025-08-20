<p align="center">
  <a href="https://nextjs.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png">
      <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" height="128">
    </picture>
    <h1 align="center">Next.js</h1>
  </a>
</p>

<p align="center">
  <a aria-label="Vercel logo" href="https://vercel.com">
    <img src="https://img.shields.io/badge/MADE%20BY%20Vercel-000000.svg?style=for-the-badge&logo=Vercel&labelColor=000">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/next">
    <img alt="" src="https://img.shields.io/npm/v/next.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/vercel/next.js/blob/canary/license.md">
    <img alt="" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Join the community on GitHub" href="https://github.com/vercel/next.js/discussions">
    <img alt="" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&logo=Next.js&labelColor=000000&logoWidth=20">
  </a>
</p>

## Gallery CMS

Gallery CMS – This project serves as the gellery cms, built using [Next.js](https://nextjs.org/), a React framework for production-level applications.

---

## Tech Stack

- Node.js (>= v22.0.0)

- Next Version : 15

- NPM: Installed and configured

---

## Project Structure

Here’s a basic overview of the project structure:

```
actions                # All Server Actions
/app
  (admin)              # Group Admin Pages
  (auth)               # Group Auth Pages
  api                  # SSR API
  forbidden            # Default Forbidden Page
  media                # Gateway All Media (Images, Videos, etc.)
  v1                   # Gateway All API
  /error.tsx           # Default Error Page
  /globals.css         # Global Styles
  /layout.tsx          # Root Layout for App
  /not-found.tsx       # Default Not Found Page
  /page.tsx            # App Page
/components            # Reusable components (UI, Layout, etc.)
/contexts              # All Global Context
/hooks                 # All Global Hooks
/libs                  # Reusable Library (Constants, Interceptors, Utils, etc.)
/types                 # All Types
/views                 # All Page Views
middleware.ts          # Global Middleware for Session Management
```

---

## Configuration

The application uses environment variables for configuration. Before running, copy .env.example to .env and set the required values:

```bash
.env
```

Ensure .env contains the following:

```bash
# APP CONFIG
APP_PORT=3000
# eg: http://localhost:3000 (local dev) or http://domain.com (server)
APP_BASE_URL=http://localhost:3000
# eg: http://localhost:8080 (local dev) or http://container-api:port (server)
API_BASE_URL=http://localhost:8080

# SECRET CONFIG
# generate secret using: openssl rand -base64 24
SIGN_SECRET='secret'
SESSION_SECRET='secret'
```

---

## Development

To run the service locally, you can either use Docker or run it manually.

### Setup

Make sure you have **Node.js** installed.

Install dependencies:

```bash
npm install
```

### Start the App

Run the app in development mode:

```bash
npm run dev
```

---

## Deployment

### Deployment Branches

- `dev`
- `stag`
- `main`

### Deploy to Development

```bash
make deploy-dev
```

### Deploy to Staging

```bash
make deploy-stag
```

### Deploy to Production

```bash
make deploy-prod
```

You can now open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## License

This project is licensed under the MIT License.
