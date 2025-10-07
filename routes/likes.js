const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/likes/:postId
// @desc    Like or unlike a post
// @access  Private
router.post('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id;
    const existingLike = post.likes.find(
      like => like.user.toString() === userId.toString()
    );

    if (existingLike) {
      // Unlike the post
      post.likes = post.likes.filter(
        like => like.user.toString() !== userId.toString()
      );
      await post.save();
      
      res.json({ 
        message: 'Post unliked successfully',
        liked: false,
        likeCount: post.likeCount
      });
    } else {
      // Like the post
      post.likes.push({ user: userId });
      await post.save();
      
      res.json({ 
        message: 'Post liked successfully',
        liked: true,
        likeCount: post.likeCount
      });
    }
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: 'Server error while liking post' });
  }
});

// @route   GET /api/likes/:postId
// @desc    Check if user has liked a post
// @access  Private
router.get('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id;
    const hasLiked = post.likes.some(
      like => like.user.toString() === userId.toString()
    );

    res.json({ 
      hasLiked,
      likeCount: post.likeCount
    });
  } catch (error) {
    console.error('Check like status error:', error);
    res.status(500).json({ message: 'Server error while checking like status' });
  }
});

// @route   GET /api/likes/:postId/users
// @desc    Get users who liked a post
// @access  Public
router.get('/:postId/users', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('likes.user', 'username profilePicture');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likedUsers = post.likes.map(like => ({
      user: like.user,
      likedAt: like.likedAt
    }));

    res.json({ 
      likedUsers,
      likeCount: post.likeCount
    });
  } catch (error) {
    console.error('Get liked users error:', error);
    res.status(500).json({ message: 'Server error while fetching liked users' });
  }
});

module.exports = router;
