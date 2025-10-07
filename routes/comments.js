const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/comments/:postId
// @desc    Add a comment to a post
// @access  Private
router.post('/:postId', [
  auth,
  body('content')
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ max: 200 })
    .withMessage('Comment cannot exceed 200 characters')
    .trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const { content } = req.body;

    const comment = {
      user: req.user._id,
      content
    };

    post.comments.push(comment);
    await post.save();

    // Populate the comment with user details
    await post.populate('comments.user', 'username profilePicture');

    const newComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment,
      commentCount: post.commentCount
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error while adding comment' });
  }
});

// @route   GET /api/comments/:postId
// @desc    Get all comments for a post
// @access  Public
router.get('/:postId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const post = await Post.findById(req.params.postId)
      .populate('comments.user', 'username profilePicture');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Sort comments by creation date (newest first)
    const sortedComments = post.comments.sort((a, b) => b.createdAt - a.createdAt);
    
    // Apply pagination
    const paginatedComments = sortedComments.slice(skip, skip + limit);
    const totalComments = post.comments.length;
    const totalPages = Math.ceil(totalComments / limit);

    res.json({
      comments: paginatedComments,
      pagination: {
        currentPage: page,
        totalPages,
        totalComments,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error while fetching comments' });
  }
});

// @route   PUT /api/comments/:postId/:commentId
// @desc    Update a comment
// @access  Private (only comment author)
router.put('/:postId/:commentId', [
  auth,
  body('content')
    .notEmpty()
    .withMessage('Comment content is required')
    .isLength({ max: 200 })
    .withMessage('Comment cannot exceed 200 characters')
    .trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is the comment author
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    const { content } = req.body;
    comment.content = content;

    await post.save();
    await post.populate('comments.user', 'username profilePicture');

    res.json({
      message: 'Comment updated successfully',
      comment: comment
    });
  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({ message: 'Server error while updating comment' });
  }
});

// @route   DELETE /api/comments/:postId/:commentId
// @desc    Delete a comment
// @access  Private (only comment author)
router.delete('/:postId/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is the comment author
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    comment.remove();
    await post.save();

    res.json({ 
      message: 'Comment deleted successfully',
      commentCount: post.commentCount
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error while deleting comment' });
  }
});

module.exports = router;
