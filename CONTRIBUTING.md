# Contributing

Thanks for your interest in contributing to Devdopz.

This guide explains how to contribute safely, clearly, and in a way that helps
the project stay maintainable as a public open source repository.

## Before You Contribute

- Read the [Code of Conduct](./CODE_OF_CONDUCT.md).
- Search existing issues and pull requests before opening a new one.
- For larger changes, open an issue first so the direction can be discussed.
- Do not submit secrets, private keys, access tokens, or personal data.

## Ways to Contribute

You can help by:

- fixing bugs
- improving UI, accessibility, or performance
- improving documentation
- refining SEO or metadata
- reporting issues with clear reproduction steps
- suggesting scoped feature improvements

## Local Setup

1. Fork the repository.
2. Clone your fork.
3. Install dependencies:

```bash
npm install
```

4. Create a local environment file:

```bash
cp .env.example .env.local
```

5. Add the required values to `.env.local`.
6. Run the Supabase migration in:

`supabase/migrations/202603240001_create_profiles.sql`

7. Start the development server:

```bash
npm run dev
```

## Environment Rules

- `.env.local` is local-only and must never be committed.
- `.env.example` is the only env file that should be tracked.
- Use publishable keys only in client-safe public variables.
- Never commit service-role credentials or private access tokens.

## Development Expectations

- Keep changes focused and easy to review.
- Preserve the existing code style and project structure.
- Make UI changes responsive across mobile and desktop.
- Prefer clear naming over clever abstractions.
- Update docs when behavior, setup, or environment requirements change.

## Before Opening a Pull Request

Run:

```bash
npm run lint
npm run build
```

If your change affects UI, include screenshots or a short explanation of the
visible result.

## Pull Request Guidelines

Please make sure your pull request:

- explains what changed and why
- references any related issue
- keeps unrelated changes out of the branch
- includes any setup or migration notes if needed
- avoids committing generated noise or secrets

## Commit Guidance

Small, descriptive commits are preferred. Example styles:

- `fix: correct favicon metadata`
- `feat: add live GitHub contributor aggregation`
- `docs: improve security policy`

## Issue Reporting

Bug reports should include:

- what happened
- what you expected to happen
- steps to reproduce
- screenshots or logs when helpful
- browser, OS, or environment details when relevant

Feature requests should explain:

- the problem being solved
- the proposed change
- why it fits the project

## Security Reporting

Do not report security issues in public GitHub issues.

Please use the guidance in [SECURITY.md](./SECURITY.md).

## Support

For help using the project, see [SUPPORT.md](./SUPPORT.md).
