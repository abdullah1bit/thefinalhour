# Security

## Public Repository Rules

Do not commit:

- `.env` files or deployment secrets
- API keys, tokens, admin passwords, or private database URLs
- Local database files such as `*.db`
- Admin exports or backups containing private content
- Runtime uploads that were not intentionally prepared for public use

Use `backend/.env.example` and `webapp/.env.example` as templates.

## If A Secret Was Committed

1. Rotate the exposed key or password in the original provider immediately.
2. Remove the value from the repository.
3. Check git history before assuming it is gone from public view.
4. If needed, rewrite history with a tool such as `git filter-repo` or GitHub's secret-removal guidance.

## Admin Accounts

Admin credentials must be created from private environment variables and changed if they were ever committed, shared, or used in a public deployment.

## Reporting Issues

Please open a private security advisory or contact the maintainer directly for vulnerabilities involving authentication, admin access, private data, or exposed credentials.

