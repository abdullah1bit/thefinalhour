---
description: How to fix Vercel ignoring GitHub commits (Email Mismatch & Ignored Build Step)
---
# Fixing Vercel GitHub Webhook Deployment Issues

This workflow addresses the common issue where Vercel completely ignores new commits pushed to a GitHub repository, failing to trigger an automatic deployment.

This issue typically arises under two circumstances: Monorepo configuration rules, and Git author email mismatches.

## Step 1: Fix Monorepo "Ignored Build Step" Rules
In a monorepo setup (e.g., frontend in `/webapp`, backend in `/backend`), Vercel tries to save build time by ignoring commits it thinks are unrelated to the frontend folder. Sometimes it gets this wrong.

To force Vercel to build on *every* commit:
1. Go to your Vercel Project Dashboard.
2. Navigate to **Settings** -> **Git**.
3. Scroll down to the **Ignored Build Step** section.
4. Change the dropdown from "Automatic" to **Custom**.
5. the command input box, type the following:
   `exit 1`
6. Click **Save**.

*Why this works:* Returning exit code `1` forces Vercel to treat the commit as an error/change state that *must* be built, completely bypassing its smart filter.

// turbo
## Step 2: Verify Your Local Git Email Configuration
If Vercel's webhook is completely missing the commits (not even showing up in the Deployments list as "Ignored"), Vercel's security system is rejecting the webhook. This happens when the author email of the Git commit does not match your GitHub or Vercel account email.

To check and fix your local git identity:

1. **Check your current git email**:
   ```bash
   git config user.email
   ```
   If this returns a dummy email (like `deploy@vibecode.dev`), Vercel will silently reject your pushes!

2. **Update your local environment** to use your actual personal email used for GitHub:
   ```bash
   git config user.email "your-github-email@example.com"
   ```

3. **Rewrite the last commit** to stamp it with your real email identity:
   ```bash
   git commit --amend --reset-author --no-edit
   ```

4. **Force push the corrected commit** to GitHub:
   ```bash
   git push --force-with-lease
   ```

Upon force pushing, Vercel will instantly recognize the commit as belonging to the verified owner and trigger the automatic build.
