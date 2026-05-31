# The Final Hour

The Final Hour is an educational website about Islamic eschatology for everyday readers.

The idea is simple: the signs of the Hour are discussed in many places, but they are often hard to follow in order. This site brings the material into one browsable timeline with sources, glossary terms, Qur'anic references, scholarly works, and notes on different interpretations.

It does not predict dates. It does not replace scholars. It tries to make the subject easier to study without turning it into sensational content.

## What is included

- Fulfilled, unfolding, and major signs arranged in sequence
- Source links for further reading
- Glossary entries for important terms
- Qur'anic verses and scholarly references
- Notes where scholars or interpreters differ

## For developers

```
webapp/   React + Vite frontend and admin panel
backend/  Hono + Bun API, Prisma models, Better Auth
```

## A few guardrails

- No date predictions.
- Keep the tone sober and sourced.
- Present differing scholarly views clearly when they exist.
- Keep the reminder that only Allah knows the unseen.
- Treat the site as an educational resource, not a source of formal religious verdicts.

## Run it locally

Copy the example environment files and fill in private values on your machine:

```bash
cp backend/.env.example backend/.env
cp webapp/.env.example webapp/.env
```

Do not commit real `.env` files, database files, API keys, admin passwords, or exported backups.

For contribution workflow and content guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).
