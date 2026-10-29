# ReFlows

This repository is a Bun workspace managed with Turborepo.

## Structure

- `apps/user` — the existing Next.js user application.
- `packages/ui` — shared shadcn/ui components, icons, `cn` utility, and theme CSS.

## Development

Install dependencies from the repository root:

```bash
bun install
```

Run the user app or all workspace apps:

```bash
bun run dev:user
bun run dev
```

Run checks and build:

```bash
bun run lint
bun run check-types
bun run build:user
```

## Deployment

Deploy `apps/user` as its own Vercel project with `apps/user` as the Root Directory. Enable inclusion of files outside the Root Directory so the root Bun lockfile and `packages/ui` workspace are available during installation and build. Configure application environment variables for that Vercel project.

Shared theme tokens and styles live in `packages/ui/src/styles`; the app imports them from its own CSS entry point.