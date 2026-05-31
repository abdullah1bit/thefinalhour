# Contributing

Thanks for your interest in The Final Hour.

This project is an educational resource for general readers. Contributions should make the material clearer, better sourced, easier to maintain, or safer to present publicly.

## Content Principles

- Do not add date predictions.
- Keep the tone sober and educational.
- Prefer primary sources and recognized scholarly works.
- Link sources whenever possible.
- Present differing scholarly interpretations clearly when they exist.
- Avoid sensational claims, unsupported modern mappings, and overconfident conclusions.

## Development Setup

1. Install Bun and Node.js.
2. Copy the example env files:

```bash
cp backend/.env.example backend/.env
cp webapp/.env.example webapp/.env
```

3. Fill in private values locally. Do not commit `.env` files.
4. Install dependencies in each app:

```bash
cd backend && bun install
cd ../webapp && bun install
```

5. Run checks before submitting changes:

```bash
cd backend && bunx tsc --noEmit
cd ../webapp && bunx tsc -p tsconfig.app.json --noEmit
```

## Repository Hygiene

Do not commit internal agent files, local docs, secrets, database files, logs, uploads, or generated output. The `.gitignore` is set up to keep those out of public commits.

