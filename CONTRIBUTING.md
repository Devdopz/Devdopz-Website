# Contributing

Thanks for taking the time to contribute to Devdopz.

## Before You Start

- Read the [Code of Conduct](./CODE_OF_CONDUCT.md).
- Open an issue or discussion before starting larger changes.
- Keep pull requests focused and easy to review.

## Local Setup

1. Fork the repository and clone your copy.
2. Install dependencies:

```bash
npm install
```

3. Create your local environment file:

```bash
cp .env.example .env.local
```

4. Fill in your Supabase values in `.env.local`.
5. Run the SQL migration in `supabase/migrations/202603240001_create_profiles.sql`.
6. Start the development server:

```bash
npm run dev
```

## Development Guidelines

- Do not commit secrets, keys, or private tokens.
- Keep UI changes responsive and accessible.
- Prefer small, clear commits with descriptive messages.
- Run checks before opening a pull request:

```bash
npm run lint
npm run build
```

## Pull Requests

Please include:

- a short summary of what changed
- screenshots for UI changes when helpful
- notes about any new environment variables or setup steps

## Reporting Security Issues

Do not open public issues for sensitive security problems. Report them
privately to the maintainers instead.
