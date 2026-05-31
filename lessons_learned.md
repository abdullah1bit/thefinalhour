# Lessons Learned

[2026-05-31] | Issue: Secrets and local databases can become public when a private repo is opened | Root Cause: Real `.env` files, a local database, and a one-off production seed script were tracked in git | Solution/Rule: Track only `.env.example` templates, ignore local secret/database files, create admin credentials from private environment variables, and rotate any exposed provider keys.
[2026-05-31] | Issue: Internal agent files and maintenance notes can confuse public reviewers | Root Cause: `.agents`, `.claude`, `.skills`, `CLAUDE.md`, internal setup docs, and launch reports were tracked before the repo became public | Solution/Rule: Keep internal automation and private maintenance notes ignored; publish separate external README, SECURITY, and CONTRIBUTING docs.
