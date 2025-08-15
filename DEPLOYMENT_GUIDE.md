# ValidatorAI Deployment Guide

## Pushing to GitHub

### Method 1: Using Replit's GitHub Integration (Recommended)

1. **Connect to GitHub:**
   - In your Replit project, click on the "Version Control" tab in the left sidebar
   - Click "Connect to GitHub"
   - Authorize Replit to access your GitHub account
   - Select your new repository

2. **Push your code:**
   - Once connected, click "Push to GitHub"
   - All your files will be automatically synced to your GitHub repository

### Method 2: Manual Git Commands

If you prefer using git commands in the Shell:

```bash
# Initialize git repository
git init

# Add your GitHub repository as remote origin
git remote add origin https://github.com/yourusername/your-repo-name.git

# Add all files
git add .

# Commit changes
git commit -m "Initial ValidatorAI project setup"

# Push to GitHub
git push -u origin main
```

## Environment Variables for Deployment

Your developer will need these environment variables:

### Required Secrets:
- `DATABASE_URL` - PostgreSQL database connection string
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `JWT_SECRET` - Secret for user authentication (auto-generated in development)

### Database Environment Variables (if using separate DB):
- `PGHOST` - Database host
- `PGPORT` - Database port (usually 5432)
- `PGDATABASE` - Database name
- `PGUSER` - Database username
- `PGPASSWORD` - Database password

## Deployment Platform Options

### Option 1: Vercel (Recommended for Next.js-style apps)
```bash
npm install -g vercel
vercel
```

### Option 2: Railway
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Option 3: Render
- Connect your GitHub repository
- Set build command: `npm run build`
- Set start command: `npm start`

### Option 4: Heroku
```bash
npm install -g heroku
heroku create your-app-name
heroku config:set DATABASE_URL=your-database-url
heroku config:set OPENAI_API_KEY=your-openai-key
git push heroku main
```

## Production Considerations

### Database Setup
- Set up a production PostgreSQL database (Neon, Supabase, or AWS RDS)
- Run database migrations: `npm run db:push`

### Build Process
- Frontend builds to `dist/public`
- Backend bundles to `dist/index.js`
- Run: `npm run build` before deployment

### Environment Configuration
- Set `NODE_ENV=production`
- Configure proper JWT_SECRET (not auto-generated)
- Set up proper CORS origins
- Configure database connection pooling

## File Structure Overview

```
ValidatorAI/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schemas
├── attached_assets/ # Static assets
├── package.json     # Dependencies and scripts
└── vite.config.ts   # Build configuration
```

## Key Features to Test After Deployment

1. **AI Validation** - Test idea submission and OpenAI responses
2. **Customer Simulation** - Verify customer persona generation works
3. **6-Month Journey** - Test complete simulation flow
4. **Affiliate Links** - Ensure all partner links work correctly
5. **Newsletter Signup** - Test Google Form integration
6. **Resource Downloads** - Verify text file downloads function

## Analytics Tracking

The app includes click tracking for affiliate partners:
- Bubble, Beehiiv, LivePlan, Gamma, Miro, Notion, Augment, Lovable
- Analytics dashboard available at `/aron`
- Click data stored in database for revenue optimization

## Support

If you encounter any deployment issues:
1. Check the console logs for errors
2. Verify all environment variables are set correctly
3. Ensure database connectivity
4. Test API endpoints individually