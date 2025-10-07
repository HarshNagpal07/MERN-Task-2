const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPIs() {
  console.log('🚀 Testing Social Media APIs...\n');

  try {
    // Test 1: Check if server is running
    console.log('1. Testing server connection...');
    const healthResponse = await axios.get('http://localhost:5000');
    console.log('✅ Server is running:', healthResponse.data.message);

    // Test 2: Register a new user
    console.log('\n2. Testing User Registration...');
    const registerData = {
      username: 'testuser123',
      email: 'test123@example.com',
      password: 'password123'
    };
    
    const registerResponse = await axios.post(`${API_URL}/auth/register`, registerData);
    console.log('✅ Registration successful:', registerResponse.data.message);
    const token = registerResponse.data.token;
    console.log('✅ Token received:', token ? 'Yes' : 'No');
    console.log('✅ User ID:', registerResponse.data.user.id);

    // Test 3: Login
    console.log('\n3. Testing User Login...');
    const loginData = {
      username: 'testuser123',
      password: 'password123'
    };
    
    const loginResponse = await axios.post(`${API_URL}/auth/login`, loginData);
    console.log('✅ Login successful:', loginResponse.data.message);
    console.log('✅ Login token received:', loginResponse.data.token ? 'Yes' : 'No');

    // Test 4: Get current user
    console.log('\n4. Testing Get Current User...');
    const userResponse = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ User data retrieved successfully');
    console.log('✅ Username:', userResponse.data.user.username);
    console.log('✅ Email:', userResponse.data.user.email);

    // Test 5: Create a post
    console.log('\n5. Testing Post Creation...');
    const postData = {
      content: 'This is a test post from the API test! 🚀'
    };
    
    const postResponse = await axios.post(`${API_URL}/posts`, postData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Post created successfully:', postResponse.data.message);
    const postId = postResponse.data.post._id;
    console.log('✅ Post ID:', postId);
    console.log('✅ Post content:', postResponse.data.post.content);

    // Test 6: Get all posts
    console.log('\n6. Testing Get Posts...');
    const postsResponse = await axios.get(`${API_URL}/posts`);
    console.log('✅ Posts retrieved successfully');
    console.log('✅ Number of posts:', postsResponse.data.posts.length);
    console.log('✅ First post author:', postsResponse.data.posts[0]?.author?.username);

    // Test 7: Like a post
    console.log('\n7. Testing Like Post...');
    const likeResponse = await axios.post(`${API_URL}/likes/${postId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Post liked successfully:', likeResponse.data.message);
    console.log('✅ Like count:', likeResponse.data.likeCount);
    console.log('✅ Liked status:', likeResponse.data.liked);

    // Test 8: Add a comment
    console.log('\n8. Testing Add Comment...');
    const commentData = {
      content: 'This is a test comment! 💬'
    };
    
    const commentResponse = await axios.post(`${API_URL}/comments/${postId}`, commentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Comment added successfully:', commentResponse.data.message);
    console.log('✅ Comment count:', commentResponse.data.commentCount);

    // Test 9: Get comments
    console.log('\n9. Testing Get Comments...');
    const commentsResponse = await axios.get(`${API_URL}/comments/${postId}`);
    console.log('✅ Comments retrieved successfully');
    console.log('✅ Number of comments:', commentsResponse.data.comments.length);
    console.log('✅ First comment:', commentsResponse.data.comments[0]?.content);

    console.log('\n🎉 ALL API TESTS PASSED SUCCESSFULLY!');
    console.log('\n📋 Summary:');
    console.log('✅ User Registration - Working');
    console.log('✅ User Login - Working');
    console.log('✅ JWT Authentication - Working');
    console.log('✅ Post Creation - Working');
    console.log('✅ Post Retrieval - Working');
    console.log('✅ Like System - Working');
    console.log('✅ Comment System - Working');
    console.log('\n🚀 Your MERN Social Media App is ready!');
    console.log('\n🔗 Access URLs:');
    console.log('- Backend API: http://localhost:5000');
    console.log('- Frontend: http://localhost:3000 (start with: cd client && npm start)');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    if (error.response?.data?.errors) {
      console.error('Validation errors:', error.response.data.errors);
    }
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure backend is running: npm run dev');
    console.log('2. Make sure MongoDB is running: mongod');
    console.log('3. Check if port 5000 is available');
  }
}

testAPIs();
