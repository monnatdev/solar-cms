# Solar Cell CMS - Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the Solar Cell CMS application to production.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Production Setup                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐         ┌───────────��──┐                 │
│  │   Vercel     │         │   Railway    │                 │
│  │  (Frontend)  │────────▶│ (Payload CMS)│                 │
│  │              │  API    │              │                 │
│  │  Next.js App │         │  Backend API │                 │
│  └──────────────┘         └──────────────┘                 │
│         │                        │                          │
│         │                        │                          │
│         ▼                        ▼                          │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │ Vercel Edge  │         │  MongoDB     │                 │
│  │   Network    │         │   Atlas      │                 │
│  │    (CDN)     │         │ (Database)   │                 │
│  └──────────────┘         └──────────────┘                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account (for repository hosting)
- [ ] Vercel account (for frontend deployment)
- [ ] Railway account (for backend deployment)
- [ ] MongoDB Atlas account (for database)
- [ ] Domain name (optional, for custom domain)

## Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click "Build a Database"
4. Choose "Shared" (Free tier) or "Dedicated" (Paid)
5. Select your cloud provider and region (choose closest to your users)
6. Click "Create Cluster"

### 1.2 Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (save these securely!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### 1.3 Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For Railway deployment, click "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: This is safe because authentication is still required
4. Click "Confirm"

### 1.4 Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with your database name (e.g., `solar-cms`)

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/solar-cms?retryWrites=true&w=majority
```

## Step 2: Deploy Payload CMS (Backend)

### 2.1 Prepare Backend Repository

Ensure your Payload CMS backend is in a separate Git repository with:
- `package.json` with all dependencies
- `src/` directory with Payload configuration
- `.env.example` file with required environment variables

### 2.2 Deploy to Railway

1. Go to [Railway](https://railway.app/)
2. Sign up or log in with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your Payload CMS repository
6. Railway will automatically detect it's a Node.js project

### 2.3 Configure Environment Variables

In Railway project settings, add these environment variables:

```env
# Database
DATABASE_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/solar-cms?retryWrites=true&w=majority

# Payload Secret (generate a random string)
PAYLOAD_SECRET=your-very-secret-random-string-here

# CORS Origins (add your frontend domain)
CORS_ORIGINS=https://your-frontend-domain.vercel.app,http://localhost:3000

# Port (Railway will set this automatically, but you can specify)
PORT=3001

# Node Environment
NODE_ENV=production
```

**Generate PAYLOAD_SECRET:**
```bash
# On Mac/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2.4 Deploy and Test

1. Railway will automatically deploy your backend
2. Once deployed, note the public URL (e.g., `https://your-app.railway.app`)
3. Test the API:
   ```bash
   curl https://your-app.railway.app/api/health
   ```
4. Access admin panel: `https://your-app.railway.app/admin`

## Step 3: Deploy Frontend (Next.js)

### 3.1 Prepare Frontend Repository

Ensure your frontend repository has:
- `package.json` with all dependencies
- `next.config.ts` properly configured
- `.env.local.example` with required variables

### 3.2 Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign up or log in with GitHub
3. Click "Add New Project"
4. Import your frontend repository
5. Vercel will automatically detect it's a Next.js project

### 3.3 Configure Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### 3.4 Configure Environment Variables

In Vercel project settings, add these environment variables:

```env
# Payload CMS API URL (from Railway)
NEXT_PUBLIC_PAYLOAD_API_URL=https://your-app.railway.app

# Site URL (Vercel will provide this)
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Optional: Google Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3.5 Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application
3. Once deployed, you'll get a URL like `https://your-project.vercel.app`

### 3.6 Test Deployment

1. Visit your Vercel URL
2. Check that all pages load correctly
3. Test the calculator
4. Test the lead form
5. Verify images load properly

## Step 4: Configure Custom Domain (Optional)

### 4.1 Add Domain to Vercel

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., `www.yourdomain.com`)
4. Vercel will provide DNS records to configure

### 4.2 Configure DNS

In your domain registrar (GoDaddy, Namecheap, etc.):

**For apex domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 4.3 Update Environment Variables

Update these environment variables in both Vercel and Railway:

**Vercel:**
```env
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
```

**Railway:**
```env
CORS_ORIGINS=https://www.yourdomain.com,https://yourdomain.com,http://localhost:3000
```

### 4.4 Wait for SSL

Vercel will automatically provision an SSL certificate. This usually takes a few minutes.

## Step 5: Post-Deployment Configuration

### 5.1 Create Admin User in Payload CMS

1. Go to your Payload CMS admin panel: `https://your-app.railway.app/admin`
2. Create your first admin user
3. Log in and verify access

### 5.2 Add Initial Content

1. Create a few test articles
2. Create services
3. Create reviews
4. Upload images

### 5.3 Test Frontend

1. Visit your frontend URL
2. Verify content appears correctly
3. Test all pages:
   - Home page
   - Services page
   - Reviews page
   - Articles page
   - Individual article/service pages

### 5.4 Test Forms

1. Test the solar calculator
2. Test the lead form
3. Verify leads appear in Payload CMS admin

## Step 6: Performance Testing

### 6.1 Run Lighthouse

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Desktop" and all categories
4. Click "Analyze page load"
5. Verify scores meet targets:
   - Performance: ≥ 70
   - Accessibility: ≥ 90
   - Best Practices: ≥ 90
   - SEO: ≥ 90

### 6.2 Test Core Web Vitals

Check these metrics:
- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TTI** (Time to Interactive): < 3.0s
- **CLS** (Cumulative Layout Shift): < 0.1

### 6.3 Test on Mobile

1. Use Chrome DevTools device emulation
2. Test on actual mobile devices
3. Verify responsive design works correctly

## Step 7: Set Up Monitoring (Optional)

### 7.1 Vercel Analytics

Vercel Analytics is automatically enabled for all projects. View analytics in your Vercel dashboard.

### 7.2 Google Analytics (Optional)

1. Create a Google Analytics account
2. Create a new property
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Add to Vercel environment variables:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
5. Redeploy

### 7.3 Sentry Error Tracking (Optional)

1. Create a Sentry account
2. Create a new project
3. Get your DSN
4. Install Sentry:
   ```bash
   npm install @sentry/nextjs
   ```
5. Configure Sentry (follow their Next.js guide)
6. Add DSN to environment variables

## Troubleshooting

### Frontend Can't Connect to Backend

**Problem**: API calls fail with CORS errors

**Solution**:
1. Verify `NEXT_PUBLIC_PAYLOAD_API_URL` is correct in Vercel
2. Verify `CORS_ORIGINS` includes your frontend domain in Railway
3. Check Railway logs for errors
4. Ensure backend is running

### Images Not Loading

**Problem**: Images show broken or don't load

**Solution**:
1. Verify images are uploaded to Payload CMS
2. Check image URLs in browser network tab
3. Verify Payload CMS media storage is configured
4. Check Railway logs for errors

### Build Fails on Vercel

**Problem**: Vercel build fails

**Solution**:
1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check for TypeScript errors
5. Verify environment variables are set

### Database Connection Fails

**Problem**: Payload CMS can't connect to MongoDB

**Solution**:
1. Verify `DATABASE_URI` is correct
2. Check MongoDB Atlas network access allows Railway IPs
3. Verify database user credentials
4. Check Railway logs for specific error

### Slow Performance

**Problem**: Pages load slowly

**Solution**:
1. Run Lighthouse audit to identify issues
2. Check image sizes and optimization
3. Verify code splitting is working
4. Check API response times
5. Consider upgrading Railway/Vercel plans

## Maintenance

### Regular Tasks

**Weekly:**
- Check error logs in Railway and Vercel
- Monitor performance metrics
- Review user feedback

**Monthly:**
- Update dependencies:
  ```bash
  npm update
  npm audit fix
  ```
- Review and optimize slow pages
- Check for security updates

**Quarterly:**
- Full performance audit
- SEO audit
- Accessibility audit
- Security audit

### Updating the Application

**Frontend Updates:**
1. Make changes in your local repository
2. Test locally: `npm run dev`
3. Run tests: `npm run test`
4. Commit and push to GitHub
5. Vercel will automatically deploy

**Backend Updates:**
1. Make changes in your backend repository
2. Test locally
3. Commit and push to GitHub
4. Railway will automatically deploy

### Backup Strategy

**Database Backups:**
1. MongoDB Atlas provides automatic backups
2. Configure backup schedule in Atlas
3. Test restore process periodically

**Code Backups:**
- Code is backed up in GitHub
- Consider using GitHub's backup features
- Keep local copies of important configurations

## Security Best Practices

### 1. Environment Variables

- ✅ Never commit `.env` files to Git
- ✅ Use strong, random values for secrets
- ✅ Rotate secrets regularly
- ✅ Use different secrets for dev/staging/production

### 2. Database Security

- ✅ Use strong database passwords
- ✅ Limit network access where possible
- ✅ Enable MongoDB Atlas encryption
- ✅ Regular backups

### 3. Application Security

- ✅ Keep dependencies updated
- ✅ Run security audits: `npm audit`
- ✅ Enable 2FA for admin accounts
- ✅ Monitor for suspicious activity
- ✅ Use HTTPS everywhere (automatic with Vercel)

### 4. Access Control

- ✅ Limit admin access to trusted users
- ✅ Use strong passwords
- ✅ Enable 2FA where available
- ✅ Review access logs regularly

## Support and Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

### Community

- [Next.js Discord](https://nextjs.org/discord)
- [Payload CMS Discord](https://discord.gg/payload)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review application logs (Railway/Vercel dashboards)
3. Search documentation and community forums
4. Check GitHub issues for similar problems
5. Create a new issue with detailed information

## Conclusion

Your Solar Cell CMS is now deployed and ready for production use! 🎉

Remember to:
- Monitor performance regularly
- Keep dependencies updated
- Back up your data
- Review security practices
- Gather user feedback for improvements

Happy deploying! 🚀
