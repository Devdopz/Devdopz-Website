# Devdopz Website

The official Devdopz website and community platform, built with Next.js.

This repository powers the public site experience for Devdopz, including:

- the home, journey, people, projects, and hire pages
- a clean login and signup flow
- a profile system backed by Supabase
- a public hire directory driven by contributor profiles

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase Auth + Postgres

## Features

- modern landing page for the Devdopz organization
- dedicated journey, people, projects, and hire routes
- Supabase-powered signup, login, and profile management
- public contributor hiring profiles with configurable contact destinations
- responsive UI designed for desktop and mobile

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your local environment file

```bash
cp .env.example .env.local
```

Add your values to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SITE_URL=https://www.devdopz.com
```

### 3. Set up Supabase

Run the SQL migration in your Supabase project:

`supabase/migrations/202603240001_create_profiles.sql`

This creates the `profiles` table, row-level security policies, and the
timestamp trigger used by the profile system.

### 4. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Environment and Security

- `.env.local` is for local development and should never be committed.
- `.env.example` is safe to commit and documents required variables.
- Do not commit API keys, access tokens, or service role credentials.

## Project Structure

```text
src/app            App routes
src/components     Shared UI components
src/data           Static content and contributor data
src/lib            Supabase and profile helpers
supabase/migrations Database schema setup
public             Static assets
```

## Open Source

This project is released under the MIT License. See [LICENSE](./LICENSE).

Please read:

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Security Policy](./SECURITY.md)
- [Support Guide](./SUPPORT.md)

## Notes

- Some features depend on a configured Supabase project.
- If login, signup, or profiles are not working, confirm your environment
  variables are set and the migration has been run.
- The repository includes GitHub issue templates, a pull request template,
  Dependabot config, and a CI workflow for public open source collaboration.
