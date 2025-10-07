# Social Media MERN Stack Application

A full-stack social media application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

### Backend APIs
- **User Registration**: Register with email, username, and password
- **User Login**: Login with username/email and password
- **Forgot Password**: Password reset functionality
- **Posts CRUD**: Create, Read, Update, Delete social media posts
- **Likes**: Like and unlike posts
- **Comments**: Add, update, and delete comments on posts

### Frontend
- **Authentication Pages**: Login, Register, Forgot Password
- **Dashboard**: View all posts with like and comment functionality
- **Post Management**: Create, edit, and delete posts
- **Real-time Updates**: Like and comment interactions

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd social-media-app
npm install
cd client && npm install && cd ..
npm run setup
```

### 2. Database Setup (Choose one option)

#### Option A: Local MongoDB
1. Install MongoDB: https://docs.mongodb.com/manual/installation/
2. Start MongoDB: `mongod`
3. Test connection: `npm run test-mongodb`

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Create free account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` file with your MongoDB Atlas URI

### 3. Start the Application

#### Quick Start (Both Backend & Frontend)
```bash
npm run dev:full
```

#### Manual Start
```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend  
cd client && npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Test**: `npm run test-api`

## Detailed Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step-by-Step Installation

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd social-media-app
   ```

2. **Install Dependencies**
   ```bash
   # Backend dependencies
   npm install
   
   # Frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Configuration**
   ```bash
   # Auto-setup (creates .env file)
   npm run setup
   
   # Or manually create .env file:
   ```
   ```env
   MONGODB_URI=mongodb://localhost:27017/socialmedia
   JWT_SECRET=your_jwt_secret_key_here_make_it_very_long_and_secure
   JWT_EXPIRE=7d
   NODE_ENV=development
   PORT=5000
   ```

4. **Database Setup**
   
   **For Local MongoDB:**
   ```bash
   # Install MongoDB (if not installed)
   # Windows: Download from https://www.mongodb.com/try/download/community
   # macOS: brew install mongodb-community
   # Ubuntu: sudo apt-get install mongodb
   
   # Start MongoDB
   mongod
   
   # Test connection
   npm run test-mongodb
   ```
   
   **For MongoDB Atlas:**
   - Sign up at https://www.mongodb.com/atlas
   - Create a free cluster
   - Get connection string
   - Update MONGODB_URI in .env file

5. **Start Application**
   ```bash
   # Both backend and frontend
   npm run dev:full
   
   # Or separately:
   npm run dev        # Backend only
   cd client && npm start  # Frontend only
   ```

6. **Test the Application**
   ```bash
   # Test API endpoints
   npm run test-api
   
   # Open browser
   # Frontend: http://localhost:3000
   # Backend: http://localhost:5000
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Send password reset email
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected, author only)
- `DELETE /api/posts/:id` - Delete post (protected, author only)
- `GET /api/posts/user/:userId` - Get user's posts

### Likes
- `POST /api/likes/:postId` - Like/unlike post (protected)
- `GET /api/likes/:postId` - Check like status (protected)
- `GET /api/likes/:postId/users` - Get users who liked post

### Comments
- `GET /api/comments/:postId` - Get post comments (with pagination)
- `POST /api/comments/:postId` - Add comment (protected)
- `PUT /api/comments/:postId/:commentId` - Update comment (protected, author only)
- `DELETE /api/comments/:postId/:commentId` - Delete comment (protected, author only)

## Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials
3. **Create Posts**: Share your thoughts and updates
4. **Interact**: Like and comment on posts from other users
5. **Manage**: Edit or delete your own posts

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- express-validator
- cors

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- Axios
- Context API

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Protected routes

## Project Structure

```
social-media-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── package.json
├── models/                 # MongoDB models
├── routes/                 # API routes
├── middleware/             # Custom middleware
├── server.js              # Express server
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
