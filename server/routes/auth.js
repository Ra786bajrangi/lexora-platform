const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Activity = require('../models/Activity'); 

const router = express.Router();
const { check, validationResult } = require('express-validator');
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log("Incoming Registration:", { username, email, password, role });

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      username,
      email,
      password,
      role: role || 'user' // default to user
    });

    await newUser.save();
    console.log("User saved:", newUser);

    const payload = {
      user: {
        id: newUser.id,
        role: newUser.role,
        username: newUser.username
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
      if (err) return res.status(500).json({ msg: 'Token generation failed' });
      res.json({ token });
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).send('Server error');
  }
});
router.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    await Activity.create({
      user: user._id,
      type: 'login',
    });

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        username: user.username
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;


