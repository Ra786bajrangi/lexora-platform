const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkAdmin = require('../middleware/checkAdmin');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Activity = require('../models/Activity'); 


router.get('/users', auth, checkAdmin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});


router.put('/users/:id/toggle', auth, checkAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isActive = !user.isActive;
  await user.save();
  res.json(user);
});


router.get('/blogs', auth, checkAdmin, async (req, res) => {
  const blogs = await Blog.find().populate('author', 'username email');
  res.json(blogs);
});

router.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('user', 'username email')
      .sort({ timestamp: -1 })
      .limit(20);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});



router.delete('/blogs/:id', auth, checkAdmin, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Blog deleted' });
});

module.exports = router;
