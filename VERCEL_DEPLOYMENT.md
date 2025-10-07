# 🚀 Vercel Deployment Guide

## ✅ Issues Fixed

1. **Crypto Module**: Removed the `crypto` package dependency (it's built-in to Node.js)
2. **Vercel Configuration**: Added proper `vercel.json` configuration
3. **Serverless Export**: Modified `server.js` to export the app for Vercel

## 📋 Pre-Deployment Checklist

- ✅ Crypto issue fixed
- ✅ `vercel.json` created
- ✅ `server.js` exports app
- ✅ Environment variables ready

## 🔧 Vercel Deployment Steps

### Step 1: Setup MongoDB Atlas (Required)

1. Go to https://www.mongodb.com/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs: `0.0.0.0/0` (for Vercel)
5. Get your connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/socialmedia?retryWrites=true&w=majority
   ```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com
2. Sign in with GitHub/GitLab/Bitbucket
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect the configuration

### Step 3: Set Environment Variables in Vercel

Go to your project settings → Environment Variables and add:

```env
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your_very_long_and_secure_jwt_secret_key_123456789
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
```

**Important**: 
- Use your actual MongoDB Atlas connection string
- Create a strong JWT_SECRET (long random string)

### Step 4: Redeploy

After adding environment variables:
1. Go to Deployments tab
2. Click on the latest deployment
3. Click "Redeploy"

## 🧪 Testing Your Deployed API

Once deployed, test your endpoints:

```bash
# Replace YOUR_VERCEL_URL with your actual Vercel URL

# Test health endpoint
curl https://YOUR_VERCEL_URL.vercel.app/

# Test registration
curl -X POST https://YOUR_VERCEL_URL.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST https://YOUR_VERCEL_URL.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## 🔍 Common Issues & Solutions

### Issue 1: "API is running" but endpoints don't work
**Solution**: Make sure all environment variables are set in Vercel dashboard

### Issue 2: MongoDB connection timeout
**Solution**: 
- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Check your connection string is correct
- Make sure username and password are URL-encoded

### Issue 3: Module not found errors
**Solution**:
- Run `npm install` locally
- Commit `package.json` and `package-lock.json`
- Redeploy

### Issue 4: Crypto module error
**Solution**: Already fixed! We're using `node:crypto` (built-in)

## 📱 Frontend Deployment

For the frontend (React app), you have two options:

### Option 1: Deploy Frontend Separately on Vercel
```bash
cd client
vercel
```

Then update the frontend API URL:
- Create `client/.env.production`:
```env
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

### Option 2: Deploy Frontend on Netlify/Vercel
1. Build the React app: `cd client && npm run build`
2. Deploy the `build` folder
3. Set environment variable:
   ```
   REACT_APP_API_URL=https://your-backend.vercel.app/api
   ```

## ✅ Verification Checklist

After deployment, verify:
- [ ] Backend API responds at root URL
- [ ] `/api/auth/register` works
- [ ] `/api/auth/login` works
- [ ] `/api/posts` works
- [ ] MongoDB connection is successful
- [ ] Environment variables are set
- [ ] No crypto errors in logs

## 🎯 Expected Results

### Backend (Vercel)
- URL: `https://your-project.vercel.app`
- Response: `{"message":"Social Media API is running!"}`
- All API endpoints accessible at `/api/*`

### Frontend (Separate deployment)
- URL: `https://your-frontend.vercel.app` or `.netlify.app`
- Connects to backend API
- Full functionality working

## 📊 Project Structure for Vercel

```
social-media-app/
├── api/
│   └── index.js          # Vercel serverless entry
├── models/               # MongoDB models
├── routes/               # API routes
├── middleware/           # Auth middleware
├── server.js            # Main server (exports app)
├── vercel.json          # Vercel configuration
├── package.json         # Dependencies (no crypto package)
└── .env                 # Local environment (not deployed)
```

## 🚀 Success!

Your MERN Social Media App is now deployed on Vercel!

- Backend API working ✅
- MongoDB connected ✅
- All endpoints functional ✅
- No crypto errors ✅
