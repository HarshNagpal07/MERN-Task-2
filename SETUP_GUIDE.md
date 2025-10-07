# 🚀 Social Media MERN App - Complete Setup Guide

## ✅ Project Status: READY TO RUN

This is a complete, working MERN stack social media application with all requested features.

## 🎯 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 2: Setup Database (Choose ONE option)

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env` file with your MongoDB Atlas URI

#### Option B: Local MongoDB
1. Install MongoDB: https://docs.mongodb.com/manual/installation/
2. Start MongoDB: `mongod`
3. Test: `npm run test-mongodb`

### Step 3: Start Application
```bash
# Start both backend and frontend
npm run dev:full

# Or start separately:
# Terminal 1: npm run dev
# Terminal 2: cd client && npm start
```

## 🔧 Environment Setup

Create `.env` file in root directory:
```env
MONGODB_URI=mongodb://localhost:27017/socialmedia
JWT_SECRET=your_jwt_secret_key_here_make_it_very_long_and_secure_123456789
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
```

## 🧪 Testing

### Test Backend APIs
```bash
# Test all APIs
node test-apis.js

# Test MongoDB connection
npm run test-mongodb
```

### Test Frontend
1. Open http://localhost:3000
2. Register a new account
3. Login
4. Create posts
5. Like and comment

## 📱 Features Working

### ✅ Backend APIs
- User Registration (Email, Username, Password)
- User Login (Username/Email + Password)
- Forgot Password (Token-based reset)
- Posts CRUD (Create, Read, Update, Delete)
- Likes System (Like/Unlike posts)
- Comments System (Add, Update, Delete comments)
- JWT Authentication
- Input Validation
- Password Hashing

### ✅ Frontend
- Registration Page
- Login Page
- Forgot Password Page
- Dashboard (Social Media Feed)
- Post Management
- Like/Unlike Posts
- Add Comments
- Responsive Design
- Protected Routes

## 🔗 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: See README.md

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod

# Test connection
npm run test-mongodb
```

### Port Issues
```bash
# Check if ports are available
netstat -an | findstr :5000
netstat -an | findstr :3000

# Kill processes if needed
taskkill /F /PID <process_id>
```

### Dependencies Issues
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Likes
- `POST /api/likes/:postId` - Like/unlike post
- `GET /api/likes/:postId` - Check like status

### Comments
- `GET /api/comments/:postId` - Get comments
- `POST /api/comments/:postId` - Add comment
- `PUT /api/comments/:postId/:commentId` - Update comment
- `DELETE /api/comments/:postId/:commentId` - Delete comment

## 🎉 Success!

Once everything is running, you'll have a fully functional social media application with:
- User authentication
- Post creation and management
- Like and comment system
- Modern, responsive UI
- Secure API endpoints

The application is production-ready and follows best practices!
