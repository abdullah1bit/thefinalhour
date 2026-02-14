# How to Setup - The Final Hour

Complete guide for deploying this website to a live domain for real users.

---

## Pre-Deployment Checklist

Before going live, complete these items:

### 1. Security

- [ ] **Change admin password**: Login to admin panel and change from default
- [ ] **Update Better Auth secret**: In `backend/.env`, change `BETTER_AUTH_SECRET` to a long random string
  ```bash
  # Generate a secure secret
  openssl rand -base64 32
  ```
- [ ] **Review admin credentials**: Consider creating a new admin user with a strong password

### 2. Content Review

- [ ] All content reviewed for accuracy
- [ ] All images are appropriate and properly attributed
- [ ] Source links point to valid URLs
- [ ] No placeholder or test content remains

### 3. Legal & Compliance

- [ ] Privacy policy page (if collecting any data)
- [ ] Terms of service (optional but recommended)
- [ ] Cookie consent banner (if required in your region)
- [ ] Content disclaimers are in place

---

## Deployment Options

### Option A: Vibecode Cloud (Easiest)

1. Click the **Deploy** button on the top right of vibecode.dev
2. Follow the deployment wizard
3. Your site will be live at a vibecode subdomain
4. Optionally connect a custom domain

### Option B: Self-Hosted (VPS/Server)

#### Requirements
- Node.js 18+ or Bun 1.0+
- A server (DigitalOcean, Linode, AWS, etc.)
- A domain name
- SSL certificate (Let's Encrypt is free)

#### Steps

1. **Clone/upload the code to your server**

2. **Setup the backend**
   ```bash
   cd backend
   bun install

   # Create production .env
   echo 'DATABASE_URL="file:./prod.db"' > .env
   echo 'BETTER_AUTH_SECRET="your-long-random-secret"' >> .env
   echo 'PORT=3000' >> .env

   # Setup database
   bunx prisma migrate deploy
   bunx prisma generate

   # Start the server
   bun run start
   ```

3. **Setup the frontend**
   ```bash
   cd webapp
   npm install

   # Build for production
   npm run build

   # The built files are in webapp/dist/
   ```

4. **Configure your web server (Nginx example)**
   ```nginx
   server {
       listen 80;
       server_name yoursite.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl;
       server_name yoursite.com;

       ssl_certificate /etc/letsencrypt/live/yoursite.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yoursite.com/privkey.pem;

       # Frontend (static files)
       location / {
           root /path/to/webapp/dist;
           try_files $uri $uri/ /index.html;
       }

       # Backend API
       location /api/ {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }

       # Uploaded files
       location /uploads/ {
           proxy_pass http://localhost:3000;
       }
   }
   ```

5. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yoursite.com
   ```

6. **Keep the backend running (using PM2)**
   ```bash
   npm install -g pm2
   cd backend
   pm2 start "bun run start" --name "thefinalhour-api"
   pm2 save
   pm2 startup
   ```

### Option C: Vercel + Railway/Render

#### Frontend on Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `webapp`
4. Add environment variable: `VITE_BACKEND_URL=https://your-backend-url.com`
5. Deploy

#### Backend on Railway
1. Create new project in Railway
2. Add your GitHub repo
3. Set root directory to `backend`
4. Add environment variables:
   - `DATABASE_URL=file:./prod.db`
   - `BETTER_AUTH_SECRET=your-secret`
5. Deploy

---

## Domain Configuration

### DNS Settings

Point your domain to your server:

| Type | Name | Value |
|------|------|-------|
| A | @ | Your server's IP address |
| A | www | Your server's IP address |
| CNAME | www | @ (or yoursite.com) |

### SSL Certificate

Always use HTTPS in production. Options:
- **Let's Encrypt**: Free, auto-renewing (recommended)
- **Cloudflare**: Free SSL if using Cloudflare DNS
- **Paid certificates**: From your domain registrar

---

## Analytics Setup

### Google Analytics 4

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (starts with `G-`)
3. Add to `webapp/index.html` in the `<head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Plausible Analytics (Privacy-Friendly Alternative)

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Add to `webapp/index.html`:
   ```html
   <script defer data-domain="yoursite.com" src="https://plausible.io/js/script.js"></script>
   ```

### Umami (Self-Hosted, Privacy-Friendly)

1. Deploy Umami to your server
2. Add tracking code to `webapp/index.html`

---

## SEO Optimization

### Already Configured
- Meta title and description in `webapp/index.html`
- Open Graph tags for social sharing
- Twitter Card tags
- robots.txt allowing all crawlers
- Semantic HTML structure

### Additional Steps

1. **Submit to Google Search Console**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add your property
   - Verify ownership (HTML file or DNS)
   - Submit your sitemap

2. **Create a sitemap** (add to `webapp/public/sitemap.xml`):
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://yoursite.com/</loc>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://yoursite.com/timeline</loc>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     <url>
       <loc>https://yoursite.com/glossary</loc>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
   </urlset>
   ```

3. **Update meta tags** in `webapp/index.html`:
   - Change `og:image` URL to your production domain
   - Update canonical URL

---

## Performance Optimization

### Frontend

1. **Images are already optimized** through the upload system
2. **Enable gzip compression** in Nginx:
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
   ```

### Backend

1. **Database indexes** are already configured
2. For high traffic, consider switching from SQLite to PostgreSQL

### CDN (Optional)

Use Cloudflare or similar CDN for:
- Faster global delivery
- DDoS protection
- Free SSL
- Caching static assets

---

## Backup Strategy

### Automated Backups

1. **Database backup script** (`backup.sh`):
   ```bash
   #!/bin/bash
   DATE=$(date +%Y%m%d_%H%M%S)
   cp backend/prisma/prod.db backups/db_$DATE.db
   tar -czf backups/uploads_$DATE.tar.gz backend/uploads/

   # Keep only last 30 backups
   ls -t backups/db_* | tail -n +31 | xargs rm -f
   ls -t backups/uploads_* | tail -n +31 | xargs rm -f
   ```

2. **Schedule with cron** (daily at 2 AM):
   ```bash
   crontab -e
   # Add this line:
   0 2 * * * /path/to/backup.sh
   ```

3. **Off-site backup**: Sync to cloud storage (S3, Google Drive, etc.)

### Manual Backups

Use Admin > Backup to export content as JSON regularly.

---

## Monitoring

### Uptime Monitoring (Free Options)

- [UptimeRobot](https://uptimerobot.com) - 50 monitors free
- [Healthchecks.io](https://healthchecks.io) - Cron job monitoring
- [Better Uptime](https://betteruptime.com) - Status pages

### Error Tracking (Optional)

- [Sentry](https://sentry.io) - Error tracking with free tier
- [LogRocket](https://logrocket.com) - Session replay

---

## Go-Live Checklist

Final checks before announcing your site:

- [ ] Site loads on the production domain
- [ ] HTTPS is working (no mixed content warnings)
- [ ] Admin login works on production
- [ ] All content displays correctly
- [ ] Images load properly
- [ ] Search functionality works
- [ ] Mobile layout looks good
- [ ] Analytics is tracking visits
- [ ] Backup system is configured
- [ ] Error monitoring is set up (optional)
- [ ] Share on social media to test Open Graph cards

---

## Support & Resources

### Documentation
- [Prisma Docs](https://www.prisma.io/docs)
- [Hono Docs](https://hono.dev)
- [Better Auth Docs](https://www.better-auth.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Community
- GitHub Issues for bug reports
- Stack Overflow for general questions

---

## Post-Launch

After going live:

1. **Monitor** the site for the first few days
2. **Check analytics** to see visitor patterns
3. **Gather feedback** from users
4. **Regular updates** to keep content fresh
5. **Security updates** - keep dependencies updated
