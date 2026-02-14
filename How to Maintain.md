# How to Maintain - The Final Hour

A practical guide for maintaining and updating this Islamic Eschatology website.

---

## Quick Overview

This is a full-stack web application with:
- **Frontend**: React website (what visitors see)
- **Backend**: API server + SQLite database (stores all content)
- **Admin Panel**: Web interface for managing content (no coding needed)

---

## For Non-Coders: Using the Admin Panel

### Accessing the Admin Panel

1. Go to: `yoursite.com/admin/login`
2. Login with your admin credentials
3. You'll see the dashboard with content counts

### Managing Content

| Section | What it controls |
|---------|------------------|
| **Signs** | Minor signs (Fulfilled & Unfolding) shown on homepage |
| **Major Signs** | The 10 major signs section with details |
| **Glossary** | Islamic terms and definitions |
| **Verses** | Quranic verses with references |
| **Scholarly Works** | Books and authors list |
| **Timeline** | Events on the Timeline page |
| **Interpretations** | Modern scholarly interpretations |
| **Banners** | Announcement banners at top of homepage |
| **Settings** | Site title, tagline, featured verse |

### Adding/Editing Content

1. Click the section you want to edit (e.g., "Signs")
2. Click "Add" to create new, or click the pencil icon to edit existing
3. Fill in the fields:
   - **Sort Order**: Lower numbers appear first (0, 1, 2...)
   - **Source Link**: Optional external link for more reading
   - **Image**: Upload an image (for Signs, Major Signs, Timeline only)
4. Click "Save"

### Image Settings

When you upload an image, you can adjust:
- **Fit**: Cover (fills the space, may crop) or Contain (shows full image)
- **Position**: Which part of image to focus on (Center, Top, Bottom, etc.)
- **Size**: Small (120px), Medium (180px), or Large (260px) height

### Backup & Restore

1. Go to Admin > Backup
2. **Export**: Downloads all content as a JSON file (save this regularly!)
3. **Import**: Upload a backup file to restore content (WARNING: replaces existing)

### Changing Your Password

1. Go to Admin > Change Password
2. Enter current password and new password
3. Click "Change Password"

---

## For Coders: Technical Maintenance

### Project Structure

```
/home/user/workspace/
├── webapp/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── hooks/          # React Query hooks
│   │   └── lib/            # Utilities, types, API client
│   └── public/             # Static assets
│
├── backend/                # Backend (Hono + Bun)
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth middleware
│   │   ├── lib/            # Prisma, Better Auth
│   │   └── types.ts        # Zod schemas (shared contracts)
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── dev.db          # SQLite database file
│   └── uploads/            # Uploaded images
```

### Common Tasks

#### Adding a New Field to a Content Type

1. **Update schema**: `backend/prisma/schema.prisma`
   ```prisma
   model Sign {
     // ... existing fields
     newField String?  // Add your field
   }
   ```

2. **Push to database**:
   ```bash
   cd backend && bunx prisma db push
   ```

3. **Update Zod schemas**: `backend/src/types.ts`
   - Add to the read schema (e.g., `SignSchema`)
   - Add to the create schema (e.g., `CreateSignSchema`)

4. **Update frontend types**: `webapp/src/lib/types.ts`
   - Add to the interface (e.g., `Sign`)

5. **Update admin form**: Add input field to the relevant admin page

6. **Update display**: Add the field to frontend display components

#### Running Database Migrations

```bash
cd backend

# Development (quick push, no migration files)
bunx prisma db push

# Production (creates migration files)
bunx prisma migrate dev --name describe_your_change
bunx prisma migrate deploy
```

#### Checking Logs

```bash
# Backend logs
tail -f backend/server.log

# Frontend logs
tail -f webapp/server.log
```

#### Database Operations

```bash
cd backend

# Open database viewer
bunx prisma studio

# Reset database (WARNING: deletes all data)
bunx prisma db push --force-reset

# Generate Prisma client after schema changes
bunx prisma generate
```

### API Endpoints Reference

#### Public Endpoints
- `GET /api/content/homepage` - All homepage data
- `GET /api/signs` - All signs
- `GET /api/major-signs` - All major signs with details
- `GET /api/glossary` - Glossary terms
- `GET /api/verses` - Quranic verses
- `GET /api/scholarly-works` - Scholarly works
- `GET /api/timeline` - Timeline events
- `GET /api/interpretations` - Interpretations
- `GET /api/search?q=...` - Search across content

#### Admin Endpoints (require authentication)
- `POST/PUT/DELETE /api/admin/{resource}/{id}` - CRUD for all content
- `GET /api/admin/export` - Export all content as JSON
- `POST /api/admin/import` - Import content from JSON
- `PUT /api/admin/change-password` - Change admin password
- `POST /api/admin/upload` - Upload image file

### Environment Variables

**Backend** (`backend/.env`):
```
DATABASE_URL="file:./dev.db"
BETTER_AUTH_SECRET="your-secret-key"  # Change in production!
PORT=3000
```

**Frontend** (`webapp/.env`):
```
VITE_BACKEND_URL=http://localhost:3000  # Only needed in development
```

### Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Hono, Bun, TypeScript
- **Database**: SQLite via Prisma ORM
- **Auth**: Better Auth (email/password)
- **Data Fetching**: TanStack React Query

---

## Troubleshooting

### Content not showing after editing
- Wait a few seconds and refresh the page
- Check browser console for errors
- Check backend logs for API errors

### Image upload fails
- Check file size (max 5MB)
- Check file type (JPEG, PNG, WebP, GIF, SVG only)
- Check backend logs for errors

### Login not working
- Clear browser cookies and try again
- Check that Better Auth secret is set correctly
- Check backend logs for auth errors

### Database errors
- Run `bunx prisma generate` to regenerate client
- Run `bunx prisma db push` to sync schema
- Check `backend/prisma/dev.db` exists

### Styles look broken
- Clear browser cache
- Check if Tailwind is building correctly
- Run `npm run build` in webapp to check for errors

---

## Regular Maintenance Checklist

- [ ] **Weekly**: Export a backup from Admin > Backup
- [ ] **Monthly**: Review and update content as needed
- [ ] **Quarterly**: Update dependencies (`bun update` in backend, `npm update` in webapp)
- [ ] **As needed**: Change admin password if compromised
