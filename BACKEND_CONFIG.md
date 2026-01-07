# Backend Deployment Configuration

## For Render Deployment

### Environment Variables needed:
```env
PORT=10000
NODE_ENV=production

DB_HOST=<your-planetscale-host.psdb.cloud>
DB_USER=<your-username>
DB_PASSWORD=<your-password>
DB_NAME=labkom-unila
DB_PORT=3306

JWT_SECRET=generate_a_strong_secret_key_minimum_32_characters_here!@#$%

FRONTEND_URL=https://weblabkom.vercel.app
```

### Render Settings:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `server`
- **Region**: Singapore
- **Auto-Deploy**: ON

### Database Setup:
Use PlanetScale (https://planetscale.com):
1. Create database `labkom-unila`
2. Get connection string
3. Extract credentials above

### After First Deploy:
- Database tables will auto-create via Sequelize
- Default admin user will be seeded
- Check logs: https://dashboard.render.com

## For Production:
- Change `JWT_SECRET` to secure random key
- Set `NODE_ENV=production`
- Ensure `FRONTEND_URL` matches Vercel deployment
- Enable database backups in PlanetScale

## Using Postgres providers (Neon / Supabase)
If you prefer a free Postgres provider, set these environment variables instead of the MySQL ones.

Example using `DATABASE_URL` (recommended):
```env
PORT=10000
NODE_ENV=production

# Use a full DATABASE_URL from Neon/Supabase
DATABASE_URL=postgres://username:password@host:5432/dbname
DB_DIALECT=postgres

JWT_SECRET=generate_a_strong_secret_key_minimum_32_characters_here!@#$%

FRONTEND_URL=https://weblabkom.vercel.app
```

Or if you prefer separate vars:
```env
DB_DIALECT=postgres
DB_HOST=host
DB_USER=username
DB_PASSWORD=password
DB_NAME=dbname
DB_PORT=5432
```

Notes:
- `server/config/db.js` now supports `DATABASE_URL` and `DB_DIALECT`.
- For Postgres use `DB_DIALECT=postgres`.
- For MySQL keep `DB_DIALECT=mysql` or omit (defaults to `mysql`).
