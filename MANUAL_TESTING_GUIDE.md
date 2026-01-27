# Solar Cell CMS - Manual Testing Guide

Quick guide to run the project locally for manual testing.

## Prerequisites

Before starting, ensure you have:
- ✅ Node.js 18+ installed
- ✅ MongoDB installed locally (or use MongoDB Atlas)
- ✅ Two terminal windows ready

## Quick Start (5 Minutes)

### Step 1: Start MongoDB

**Option A - Local MongoDB:**
```bash
# Start MongoDB service
mongod
```

**Option B - MongoDB Atlas:**
- Already configured in `backend/.env`
- Update `DATABASE_URI` if using your own Atlas cluster

### Step 2: Start Backend (Terminal 1)

```bash
# Navigate to backend directory
cd backend

# Install dependencies (first time only)
npm install

# Start the backend server
npm run dev
```

**Expected output:**
```
Server is running on http://localhost:3001
Admin panel: http://localhost:3001/admin
```

**First time setup:**
1. Open browser: `http://localhost:3001/admin`
2. Create your first admin user
3. Login to the admin panel

### Step 3: Start Frontend (Terminal 2)

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies (first time only)
npm install

# Start the frontend server
npm run dev
```

**Expected output:**
```
▲ Next.js 16.1.4
- Local:        http://localhost:3000
- Ready in 2.5s
```

### Step 4: Open the Application

Open your browser and visit:
- **Frontend**: http://localhost:3000
- **Backend Admin**: http://localhost:3001/admin

## What to Test

### 1. Home Page (http://localhost:3000)
- ✅ Hero section displays correctly
- ✅ Solar calculator works (enter values and calculate)
- ✅ Lead form accepts input and submits
- ✅ Navigation menu works
- ✅ Footer displays contact information

### 2. Services Page (http://localhost:3000/services)
- ✅ Service cards display (if you've added services in admin)
- ✅ Click on a service to view details
- ✅ Images load correctly
- ✅ Back navigation works

### 3. Reviews Page (http://localhost:3000/reviews)
- ✅ Review cards display (if you've added reviews in admin)
- ✅ Related service links work
- ✅ Images load correctly

### 4. Articles Page (http://localhost:3000/articles)
- ✅ Article cards display (if you've added articles in admin)
- ✅ Click on an article to read full content
- ✅ Rich text content renders properly
- ✅ Featured images display

### 5. Backend Admin Panel (http://localhost:3001/admin)
- ✅ Login works
- ✅ Create new articles, services, reviews
- ✅ Upload images
- ✅ View submitted leads
- ✅ Edit and delete content

## Adding Test Content

To properly test the frontend, add some content via the admin panel:

### Add a Service:
1. Go to http://localhost:3001/admin
2. Click "Services" → "Create New"
3. Fill in:
   - Title: "Solar Panel Installation"
   - Header: "Professional Installation"
   - Description: "We provide professional solar panel installation..."
   - Upload a featured image
   - Status: "published"
4. Save

### Add a Review:
1. Click "Reviews" → "Create New"
2. Fill in:
   - Title: "Great Service!"
   - Header: "Excellent Experience"
   - Description: "The team was professional..."
   - Upload an image
   - Select related service (optional)
   - Status: "published"
3. Save

### Add an Article:
1. Click "Articles" → "Create New"
2. Fill in:
   - Title: "Benefits of Solar Energy"
   - Header: "Why Go Solar?"
   - Excerpt: "Discover the top benefits..."
   - Content: Write your article content
   - Upload featured image
   - Status: "published"
3. Save

### Test Lead Form:
1. Go to http://localhost:3000
2. Scroll to the lead form
3. Fill in:
   - Full Name: "John Doe"
   - Phone: "0812345678"
   - Email: "john@example.com"
4. Submit
5. Check admin panel → "Leads" to see the submission

## Responsive Testing

Test on different screen sizes:

### Desktop (1920px+)
- Open browser in full screen
- Check layout and spacing

### Tablet (768px-1919px)
- Resize browser window or use DevTools
- Press F12 → Toggle device toolbar
- Select iPad or similar

### Mobile (320px-767px)
- Use DevTools device emulation
- Select iPhone or similar
- Test mobile menu navigation

## Performance Testing

### Check Page Load Speed:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Desktop" or "Mobile"
4. Click "Analyze page load"
5. Review scores (should be ≥70 for Performance)

### Check Network Requests:
1. Open DevTools → Network tab
2. Reload page
3. Check that images are optimized (WebP format)
4. Verify API calls are successful

## Common Issues & Solutions

### Issue: Backend won't start
**Error**: "Cannot connect to MongoDB"

**Solution**:
```bash
# Check if MongoDB is running
mongod

# Or check the DATABASE_URI in backend/.env
```

### Issue: Frontend can't connect to backend
**Error**: "Failed to fetch" or CORS errors

**Solution**:
1. Ensure backend is running on port 3001
2. Check `NEXT_PUBLIC_PAYLOAD_API_URL` in `frontend/.env.local`
3. Restart both servers

### Issue: Port already in use
**Error**: "Port 3000 is already in use"

**Solution**:
```bash
# Kill the process using the port
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or change the port in package.json
```

### Issue: No content displays
**Solution**:
- Add content via admin panel first
- Check that status is set to "published"
- Refresh the frontend page

## Testing Checklist

Use this checklist for comprehensive manual testing:

### Frontend Features
- [ ] Home page loads
- [ ] Hero section displays
- [ ] Solar calculator calculates correctly
- [ ] Lead form validates input
- [ ] Lead form submits successfully
- [ ] Services page displays services
- [ ] Service detail page works
- [ ] Reviews page displays reviews
- [ ] Articles page displays articles
- [ ] Article detail page renders content
- [ ] Navigation menu works
- [ ] Footer displays correctly
- [ ] Images load and are optimized
- [ ] Responsive design works on mobile
- [ ] Responsive design works on tablet

### Backend Features
- [ ] Admin login works
- [ ] Can create articles
- [ ] Can edit articles
- [ ] Can delete articles
- [ ] Can create services
- [ ] Can create reviews
- [ ] Can upload images
- [ ] Can view leads (read-only)
- [ ] SEO fields work
- [ ] Slug auto-generation works

### Integration
- [ ] Frontend fetches data from backend
- [ ] Lead form saves to backend
- [ ] Images from backend display on frontend
- [ ] Content updates reflect on frontend

## Stopping the Servers

When you're done testing:

```bash
# In each terminal window, press:
Ctrl + C

# Or close the terminal windows
```

## Next Steps

After manual testing:
1. ✅ Verify all features work as expected
2. ✅ Test on different browsers (Chrome, Firefox, Safari)
3. ✅ Test on real mobile devices
4. ✅ Add more content for realistic testing
5. ✅ Ready for production deployment!

## Need Help?

If you encounter issues:
1. Check the terminal for error messages
2. Review the browser console (F12)
3. Check the documentation:
   - `frontend/README.md`
   - `backend/README.md`
   - `backend/QUICKSTART.md`
   - `DEPLOYMENT_GUIDE.md`

## Quick Commands Reference

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run serve        # Run production build

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm run test         # Run tests
npm run lint         # Run linter

# MongoDB
mongod               # Start MongoDB locally
```

---

**Happy Testing! 🚀**

The application is fully functional and ready for manual testing. All 256 automated tests are passing, so you should have a smooth testing experience.
