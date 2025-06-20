const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Blog = require('../models/Blog');
const Activity = require('../models/Activity'); 
const User = require('../models/User'); 

const upload = require('../middleware/upload');
const { check, validationResult } = require('express-validator');

// @route   POST api/blogs
// @desc    Create a blog post
router.post(
  '/',
  [
    auth,upload.single('image'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('content', 'Content is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.user.id,
        tags: req.body.tags || [],
        image: req.file ? `/uploads/${req.file.filename}` : '',
      });

      const blog = await newBlog.save();
      // ✅ Log activity: user posted a blog
      await Activity.create({
        user: req.user.id,
        type: 'create_blog',
      });
      res.json(blog);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/blogs
// @desc    Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'username');
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ✅ Reordered this above `/:id` route to prevent conflict
// @route   GET api/blogs/my-blogs
// @desc    Get current user's blogs with pagination
router.get('/my-blogs', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username avatar');

    const total = await Blog.countDocuments({ author: req.user.id });

    res.json({
      success: true,
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBlogs: total
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      message: 'Server Error' 
    });
  }
});
// @route   GET /api/blogs/trending
// @desc    Get top 6 trending blog posts based on number of likes
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const allBlogs = await Blog.find().populate('author', 'username avatar');

    // Sort by number of likes manually
    const trendingBlogs = allBlogs
      .sort((a, b) => b.likes.length - a.likes.length)
      .slice(0, 3); // top 3

    res.json(trendingBlogs);
  } catch (err) {
    console.error('Error fetching trending blogs:', err.message);
    res.status(500).send('Server Error');
  }
});
// @route   GET /api/blogs/authors
// @desc    Get unique authors who have written blogs
// @access  Public
router.get('/authors', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username avatar bio name');
    const authorMap = new Map();

    blogs.forEach(blog => {
      const a = blog.author;
      if (a && !authorMap.has(a._id.toString())) {
        authorMap.set(a._id.toString(), {
          id: a._id,
          username: a.username,
          name: a.name || a.username,
          avatar: a.avatar || '/default-avatar.png',
          bio: a.bio || 'Passionate writer',
        });
      }
    });

    res.json([...authorMap.values()].slice(0, 8));
  } catch (err) {
    console.error('Error fetching authors:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.get('/author/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) return res.status(404).json({ message: 'Author not found' });

    const blogs = await Blog.find({ author: user._id }).sort({ createdAt: -1 });

    res.json({
      author: {
        id: user._id,
        name: user.name || user.username,
        username: user.username,
        avatar: user.avatar || '/default-avatar.png',
        bio: user.bio || 'This user has not written a bio yet.',
      },
      blogs,
    });
  } catch (err) {
    console.error('Author route error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// @route   GET api/blogs/:id
// @desc    Get blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username');

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.status(500).send('Server Error');
  }
});
// @route POST /api/blogs/:id/like
// @desc Like or unlike blog
// @access Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    const userId = req.user.id;
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(id => id.toString() !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();
    res.json({ likes: blog.likes.length });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});
// @route   POST /api/blogs/:id/comments
// @desc    Add comment to blog
// @access  Private
router.post('/:id/comments', auth, async (req, res) => {
  try {
    // Input validation
    if (!req.body.text || req.body.text.trim() === '') {
      return res.status(400).json({ msg: 'Comment text is required' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    const comment = {
      user: req.user.id,
      username: req.user.username,
      text: req.body.text.trim(),
      createdAt: new Date()
    };

    blog.comments.unshift(comment);
    await blog.save();

    // Return just the newly created comment (201 Created)
    res.status(201).json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// @route   PUT api/blogs/:id
// @desc    Update a blog post
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const updatedFields = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags?.split(',').map(tag => tag.trim()),
      updatedAt: Date.now(),
    };

    if (req.file) {
      updatedFields.image = `/uploads/${req.file.filename}`;
    }

    console.log('Updating with:', updatedFields);

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (err) {
    console.error('Update blog error:', err); // full error
    res.status(500).json({ message: 'Something went wrong!' });
  }
});


// @route   DELETE api/blogs/:id
// @desc    Delete a blog post
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    // Check user is the author
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await blog.deleteOne();
    res.json({ msg: 'Blog deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
